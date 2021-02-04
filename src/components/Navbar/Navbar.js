import React from 'react';
import {connect} from 'react-redux';
import SignUp from '../SignUp/SignUp';
import {Link} from "react-router-dom";
import {logoutUser} from '../../store/actions/user';

const Navbar = (props) =>{

    const handleLogout = () =>{
        props.logoutUser();
    }

    return(
        <nav className="nav">
            <ul className="navList">
                <li id="navTitle">
                    <Link to="/" id="navTitleText">steam-bans</Link>
                </li>
                <li>
                    {props.usr.loggedIn ?
                        <div  className="navEnd">
                            <Link to="/list" className="navBtn">Tracked Users</Link>
                            <a className="navBtn" onClick={handleLogout}>Logout</a>
                            <img id="navImage" alt="userImage" src={props.usr.user.avatarmedium}></img>
                        </div>
                    :
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

const mapDispatchToProps = (dispatch) =>{
    return{
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);