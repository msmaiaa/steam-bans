import {connect} from 'react-redux';
import SignUp from '../SignUp/SignUp';
import {Link} from "react-router-dom";
import {logoutUser} from '../../store/actions/user';
import {UserProp} from '../../models/User';

type propTypes = {
    logoutUser: Function,
    usr: UserProp
}

const Navbar = ({logoutUser, usr}:propTypes) =>{

    const handleLogout = () =>{
        logoutUser();
    }

    return(
        <nav className="nav">
            <ul className="navList">
                <li id="navTitle">
                    <Link to="/" id="navTitleText">steam-bans</Link>
                </li>
                <li>
                    {usr.loggedIn ?
                        <div  className="navEnd">
                            <Link to="/list" className="navBtn">Tracked Users</Link>
                            <a className="navBtn" onClick={handleLogout}>Logout</a>
                            <img id="navImage" alt="userImage" src={usr.user.avatarmedium}></img>
                        </div>
                    :
                        <SignUp/>
                    }
                </li>
            </ul>
        </nav>
    );
}

const mapStateToProps = (state: any) => {
    return{
        usr: state.usr
    }
}

const mapDispatchToProps = (dispatch: any) =>{
    return{
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);