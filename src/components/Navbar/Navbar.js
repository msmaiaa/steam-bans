import React from 'react';

export default function Navbar(){
    const handleLogin = () =>{
        const popupWindow = window.open(
            
        )
    }

    return(
        <nav className="nav">
            <ul className="navList">
                <li>
                <img
                onClick={handleLogin}
                src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"
                alt="Login with Steam"
                />
                </li>
            </ul>
        </nav>
    );
}