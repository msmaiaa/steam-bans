import React from 'react';
import {connect} from 'react-redux';
import SignUp from '../SignUp/SignUp';

const Navbar = (props) =>{

    return(
        <nav className="nav">
            <ul className="navList">
                <li id="navTitle">
                    <p>steam-bans</p>
                </li>
                <li className="navEnd">
                    {props.usr.loggedIn ? <img id="navImage" alt="userImage" src={props.usr.user.avatarmedium}></img> :
                    <SignUp/>
                    }
                </li>
            </ul>
        </nav>
    );
}

const mapStateToProps = state => {
    return{
        usr: state.usr
    }
}

  

export default connect(mapStateToProps)(Navbar);