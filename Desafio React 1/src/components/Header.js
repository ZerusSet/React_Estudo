import React, { Component } from 'react';
import logo from '../assets/logo.png'

function Header(){
    return (
        <div id="header">
            <a href="#"><h2 id="logo">Facebook</h2></a>
            <a href="#" id='perfil'>
                <h4>Meu Perfil</h4>
                <i id="espaco" className="fas fa-user-circle"></i>
            </a>
        </div>
    );
}

export default Header;