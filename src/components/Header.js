import React from "react";
import '../styles.css';


export default function Header (){
    return (

    

        <div className="header">
            <nav className="nav">
            <img className="logo" src = 'logo_webshop.png' alt="infinitefindings"></img>
            <ul><li>Home</li></ul></nav>
            <h2 className="app-subtitle">The place where you can find your needs! Find your next product here.</h2>
            
        </div>
    );
}