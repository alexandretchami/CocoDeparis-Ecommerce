import { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Se connecter");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();

        let newUrl = currState === "Se connecter" ? `${url}/api/user/login` : `${url}/api/user/register`;

        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img 
                        onClick={() => setShowLogin(false)} 
                        src={assets.cross_icon} 
                        alt="Close" 
                        aria-label="Close login form"
                    />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Se connecter" ? null : (
                        <input 
                            name='name' 
                            onChange={onChangeHandler} 
                            value={data.name} 
                            type="text" 
                            placeholder='Votre Nom' 
                            required 
                        />
                    )}
                    <input 
                        name='email' 
                        onChange={onChangeHandler} 
                        value={data.email} 
                        type="email" 
                        placeholder='Votre email' 
                        required 
                    />
                    <input 
                        name='password' 
                        onChange={onChangeHandler} 
                        value={data.password} 
                        type="password" 
                        placeholder='Mot de passe' 
                        required 
                    />
                </div>
                <button type='submit'>
                    {currState === "S'inscrire" ? "Créer un compte" : "Se connecter"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>En continuant, j'accepte les conditions d'utilisation et la politique de confidentialité.</p>
                </div>
                {currState === "Se connecter" ? (
                    <p>Créer un nouveau compte? <span onClick={() => setCurrState("S'inscrire")}>Cliquez ici</span></p>
                ) : (
                    <p>Vous avez déjà un compte? <span onClick={() => setCurrState("Se connecter")}>Connectez-vous ici</span></p>
                )}
            </form>
        </div>
    );
}

export default LoginPopup;
