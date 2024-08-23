import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Sentez-vous belle et confiante avec notre collection de vêtements pour femmes, des styles qui vous ressemblent et des prix qui vous enchantent.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>TOUT SAVOIR</h2>
                <ul>
                    <li>Acceuil</li>
                    <li>À propos de nous</li>
                    <li>Livraison</li>
                    <li>Politique de confidentialité</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>CONTACTEZ-NOUS</h2>
                <ul>
                    <li>+(33) 01 80 20 88 88</li>
                    <li>contact@cocodeparis.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 © TchamiDev - Tous droits réservés</p>
    </div>
  )
}

export default Footer