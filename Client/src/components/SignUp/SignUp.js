import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {setUser} from '../../store/actions/user';

const SignUp = (props) =>{

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
                props.setUser(user);
            }
        })
    })

    return(
        <img
        onClick={handleLogin}
        src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"
        alt="Login with Steam"
        id="navBtn"
        />
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        setUser: userInfo => dispatch(setUser(userInfo))
    }
}

export default connect(null, mapDispatchToProps)(SignUp);