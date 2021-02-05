import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import {fetchUser, checkInList, createObservedUser} from '../../utils/api';
import {formatDate} from '../../utils/date';
import SignUp from '../../components/SignUp/SignUp';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 20px;
`;

const Result = (props) =>{
    const [isLoading, setLoading] = useState(true);
    const [loadingAddUser, setLoadingAddUser] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [userInList, setUserInList] = useState(false);

    const handleTrackClick = () =>{
        createObservedUser(user.steamid64)
        .then((res)=>{
            if(res.status === 200){
                setLoadingAddUser(false);
                setUserInList(true);
            }else{
                //todo popup error
            }
        })
    }

    useEffect(()=>{
        setUserInList(false);
        setUser(null);
        setError(false);
        setLoading(true);
        fetchUser(props.data)
        .then((res)=>{
            if(res.status === 200){
                checkInList(res.user.steamid64)
                .then((isInList)=>{
                    if(isInList){
                        setUserInList(true);
                    }
                    setUser(res.user);
                    setLoading(false);
                });

            }else{
                setError(true);
                setLoading(false);
            }
        })
    },[props.clicks])


    if(isLoading && !user && !error){
        return(
            <SyncLoader color={'#47859D'} css={override} size={5} />
        )
    }else if(error){
        return(
            <p style={{textAlign:'center', marginTop:'15px', fontWeight:'bold', color:'red'}}>Couldn't find the profile</p>
        )
    }else{

        return(
            <div className="results">
                <div className="results__header">
                    <img className="results__pic" src={user.avatarfull} alt="Profile Picture"/>
                    <div className="results__header-info">
                        <div className="results__field">
                            <div className="results__header-text">Community Ban: </div>
                            {user.CommunityBanned ? <p className="banned">BANNED</p> : <p className="notBanned">NOT BANNED</p>}
                        </div>
                        <div className="results__field">
                            <div className="results__header-text">Economy Ban: </div>
                            {user.EconomyBan !== "none" ? <p className="banned">BANNED</p> : <p className="notBanned">NOT BANNED</p>}
                        </div>
                        <div className="results__field">
                            <div className="results__header-text">VAC Ban: </div>
                            {user.VACBanned ? <p className="banned">BANNED</p> : <p className="notBanned">NOT BANNED</p>}
                        </div>
                        <div className="results__field">
                            <div className="results__header-text">Name: </div>
                            <p style={{fontWeight:'bold'}}>{user.personaname}</p>
                        </div>
                        <div className="results__field">
                            <div className="results__header-text">Created: </div>
                            <p style={{fontWeight:'bold'}}>{formatDate(new Date(user.timecreated * 1000))}</p>
                        </div>
                    </div>
                </div>
                <div className="results__footer">
                    <div className="results__footer-text">STEAMID</div>
                    <input disabled type="text" value={user.steamid} className="results__footer-result"></input>


                    <div className="results__footer-text">STEAMID3</div>
                    <input disabled type="text" value={user.steamid3} className="results__footer-result"></input>


                    <div className="results__footer-text">STEAMID64</div>
                    <input disabled type="text" value={user.steamid64} className="results__footer-result"></input>


                    <div className="results__footer-text">Profile</div>
                    <input disabled type="text" value={user.profileurl} className="results__footer-result"></input>

                </div>
                <div className="results__btns">
                    {props.usr.loggedIn ? 
                    <div>
                        {userInList ? 
                        <button disabled className="results__btn-inList">Already tracking user</button>
                        :
                        <div>
                            {!loadingAddUser ? 
                                <button onClick={handleTrackClick} className="results__btn-notInList">Track user</button>
                            :
                                <SyncLoader color={'#47859D'} css={override} size={3} />
                            }
                        </div>
                        
                        }
                    </div>
                    :
                    <SignUp/>
                    }
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return{
        usr: state.usr
    }
}


export default connect(mapStateToProps, null)(Result);
