import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


// utilisateur de connexion
const loginUser = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
          return res.json({success: false, message:"L'utilisateur n'existe pas"})  
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({success: false, message:"les informations d'identification invalides"})
        }

        const token = createToken(user._id);
        res.json({success: true, token})

    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Erreur"})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// enregistrer un utilisateur
const registerUser = async (req,res) =>{
    const {name,password,email} = req.body;
    try {
        // vérifier si l'utilisateur est déjà enregistré
        const exits = await userModel.findOne({email});
    if(exits){
        return res.json({success:false, message:"L'utilisateur existe déjà"})
    }
        // validation du format de l'e-mail et du mot de passe fort
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Veuillez entrer un email valide"});
        }
        if (password.length < 8) {
            return res.json({ success: false, message:"Veuillez entrer un mot de passe fort"});
        }

        // crypter le mot de passe
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Erreur"})
    }
}

export {loginUser, registerUser}
