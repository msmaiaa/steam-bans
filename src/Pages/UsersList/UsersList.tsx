import {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import {connect} from 'react-redux';
import {fetchObservedList, deleteUser, getUserInfo, testHook, updateUser} from '../../utils/api';
import {webhookRegex} from '../../utils/regex';
import {formatDate} from '../../utils/date';
import {UserProp, ResponseList, TrackedUser} from '../../models/User'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type PropTypes = {
    usr: UserProp
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 20px;
`;

const UsersList = ({usr}:PropTypes) =>{
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [hasUsers, setHasUsers] = useState(false);
    const [observedUsers, setObservedUsers] = useState<Array<TrackedUser>>([]); 
    const [expanded, setExpanded] = useState(null);
    const [sendDiscord, setSendDiscord] = useState(false);
    const [discordHook, setDiscordHook] = useState('');
    const [isValidHook, setValidHook] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            history.push('/');
        }
    }, [])

    useEffect(()=>{
        fetchObservedList()
        .then((list:ResponseList)=>{
            if(list.status === 404 || list.users.length < 1){
                setLoading(false);
                setHasUsers(false);
            }else{
                setLoading(false);
                setHasUsers(true);
                setObservedUsers(list.users);
            }
        })
        getUserInfo()
        .then((res)=>{
            if(res.status === 200){
                setSendDiscord(res.user.sendDiscord);
                setDiscordHook(res.user.discordHook);
            }else{
                //todo
            }
            
        })
    },[usr.loggedIn])

    useEffect(()=>{
        webhookRegex.test(discordHook) ? setValidHook(true) : setValidHook(false);
    },[discordHook])

    const handleDelete = (index: number) =>{
        deleteUser(observedUsers[index].steamid64)
        .then((res)=>{
            if(res.status === 200){
                let newArray = [...observedUsers];
                newArray.splice(index,1)
                setObservedUsers(newArray);
            }else{
                //todo
            }
        })

    }

    const handleChange = (panel:any) => (event:any, isExpanded:any) => {
        setExpanded(isExpanded ? panel : false);
    };

    const onInputChange = (event:any) =>{
        setDiscordHook(event.target.value);
    }

    const handleHookClick = () =>{
        updateUser(sendDiscord, discordHook)
        .then((res)=>{
            console.log(res)
        })
    }

    const handleTestClick = () =>{
        testHook(discordHook)
        .then((res)=>{
            console.log(res)
        })
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
                        {observedUsers.map((usr: TrackedUser,index: number)=>{
                            return(
                                <Accordion onChange={handleChange(index)} expanded={expanded === index} key={index}>
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
                        <div className="users__notifications-area">
                            <p className="users__notifications-title">
                                Send discord notification?
                                <input type="checkbox" checked={sendDiscord} onChange={()=>setSendDiscord(!sendDiscord)} style={{marginLeft:'10px'}}/>
                            </p>
                            {sendDiscord ? 
                            <div className="users__notifications-input-div">
                                <p className="users__notifications-text">DISCORD WEBHOOK URL</p>
                                <input type="text" className="searchInput users__notifications-input" onChange={onInputChange} value={discordHook} placeholder="Url"/>
                                <div>
                                    {isValidHook ?
                                        <div>
                                            <button onClick={handleHookClick} className="users__notifications-btn-valid">Save</button>
                                            <button onClick={handleTestClick} className="users__notifications-btn-test">Test</button>
                                        </div>
                                        :
                                        <button disabled className="users__notifications-btn-invalid">Invalid Url</button>
                                    }
                                </div>
                            </div>
                            :
                            ''
                            }
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }



}



const mapStateToProps = (state: any) =>{
    return{
        usr: state.usr
    }
}

export default connect(mapStateToProps, null)(UsersList);