
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo1.png';


 const Navbar = ()=>{
    return(
            <nav className="nav-wrapper navbar navbar-scroll">
                <div className="container">
                <Link to="/"><img className="logo" src={Logo} alt="CompoTech"></img></Link>
                    <Link to="/" className="brand-logo">CompoTech</Link>
                    
                    <ul className="right">
                        <li><Link to="/home">Shop</Link></li>
                        <li><Link to="/cart">My cart</Link></li>
                        <li><Link to="/cart"><span className="material-icons">shopping_cart</span></Link></li>
                    </ul>
                </div>
            </nav>  
    )
}

export default Navbar;