import React, {useEffect} from 'react';

export default function Navbar(){
    const handleLogin = () =>{
        const popupWindow = window.open(
            process.env.REACT_APP_API_URL + "/auth/steam",
            "_blank",
            "width=800, height=600"
        );
        if(window.focus) popupWindow.focus();
    }

    useEffect(() =>{
        window.addEventListener("message", event =>{
            if(event.origin !== process.env.REACT_APP_API_URL) return;

            const {token, ok, user} = event.data;
            if(ok){
                localStorage.setItem("token", token);
                console.log(user);
            }
        })
    })

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