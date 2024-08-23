import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://tchamidev:CocoDeParis2024&@cluster0.uzbotd1.mongodb.net/CoCoDeParis-ProjetFinal').then(()=>console.log("Base de données connectée"));
}