import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import {connect} from 'react-redux';
import {fetchObservedList} from '../../utils/api';
import {formatDate} from '../../utils/date';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 20px;
`;

const UsersList = (props) =>{
    const [isLoading, setLoading] = useState(true);
    const [hasUsers, setHasUsers] = useState(false);
    const [observedUsers, setObservedUsers] = useState([]); 
    useEffect(() => {
        fetchObservedList()
        .then((list)=>{
            if(list.status === 404){
                setLoading(false);
                setHasUsers(false);
            }else{
                setLoading(false);
                setHasUsers(true);
                setObservedUsers(list.users);
            }
        })
    }, [])

    useEffect(()=>{
    },[observedUsers])

    const handleDelete = (index) =>{
        console.log(observedUsers[index]);
    }

    
    if(isLoading){
        return(
            <div className="homeContent">
                <div className="card">
                    <SyncLoader color={'#47859D'} css={override} size={5} />
                </div>
            </div>
        )
    }else{
        return(
            <div className="homeContent">
                <div className="card shadow-black">
                    {!hasUsers ? 
                    <p className="homeContent__header-text">Looks like you're not tracking any users. Try saving one to your list <Link className="text-strong" to="/">here</Link>.</p>
                    :
                    <div>
                        <p className="users__title">Tracked Users</p>
                        {observedUsers.map((usr,index)=>{
                            return(
                                <Accordion key={index}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <img className="users__title-avatar" src={usr.avatar}/>
                                        <p className="users__title-text">{usr.personaname}</p>
                                        {usr.CommunityBanned || usr.VACBanned ? <p className="banned users__ban-text">BANNED</p> : <p className="notBanned users__ban-text">NOT BANNED</p>}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="users__info">
                                            
                                            <div className="users__field">
                                                <div className="users__text">Community Ban: </div>
                                                {usr.CommunityBanned ? <p className="banned">BANNED</p> : <p className="notBanned">NOT BANNED</p>}
                                            </div>
                                            <div className="users__field">
                                                <div className="users__text">Economy Ban: </div>
                                                {usr.EconomyBan !== "none" ? <p className="banned">BANNED</p> : <p className="notBanned">NOT BANNED</p>}
                                            </div>
                                            <div className="users__field">
                                                <div className="users__text">VAC Ban: </div>
                                                {usr.VACBanned ? <p className="banned">BANNED</p> : <p className="notBanned">NOT BANNED</p>}
                                            </div>
                                            <div className="users__field">
                                                <div className="users__text">Created: </div>
                                                <p style={{fontWeight:'bold'}}>{formatDate(new Date(usr.timecreated*1000))}</p>
                                            </div>
                                            <div className="users__field">
                                                <div className="users__text">Last seen: </div>
                                                <p style={{fontWeight:'bold'}}>{formatDate(new Date(usr.lastlogoff*1000))}</p>
                                            </div>
                                            <div className="users__footer">
                                                <div className="users__footer-text">STEAMID</div>
                                                <input disabled type="text" value={usr.steamid} className="users__footer-result"></input>

                                                <div className="users__footer-text">STEAMID3</div>
                                                <input disabled type="text" value={usr.steamid3} className="users__footer-result"></input>

                                                <div className="users__footer-text">STEAMID64</div>
                                                <input disabled type="text" value={usr.steamid64} className="users__footer-result"></input>

                                                <div className="users__footer-text">Profile</div>
                                                <input disabled type="text" value={usr.profileurl} className="users__footer-result"></input>

                                                <button className="deleteBtn" onClick={()=>handleDelete(index)}>Delete</button>
                                            </div>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </div>
                    }
                </div>
            </div>
        )
    }



}



const mapStateToProps = state =>{
    return{
        usr: state.usr
    }
}

export default connect(mapStateToProps, null)(UsersList);