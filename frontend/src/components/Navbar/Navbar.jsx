import React, { useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {

  const [menu,setMenu] = useState("menu");

  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className="logo" />
        <ul className="navbar-menu">
            <li onClick={()=>setMenu("accueil")} className={menu==="accueil"?"active":""}>accueil</li>
            <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</li>
            <li onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>application mobile</li>
            <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contactez-nous</li> 
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt="" />
                <div className="dot"></div>
            </div>
            <button>Se connecter</button>
        </div>
    </div>
  )
}

export default Navbar