import React, {useEffect, useState} from 'react';
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import {connect} from 'react-redux';
import {fetchObservedList} from '../../utils/api';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 20px;
`;

const UsersList = (props) =>{
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        fetchObservedList()
        .then((list)=>{
            console.log(list);
        })
    }, [])
    
    return(
        <div className="homeContent">
            <div className="card">
                {isLoading ? <SyncLoader color={'#47859D'} css={override} size={5} /> :
                <p>UserList</p>
                }
            </div>
        </div>
    )


}



const mapStateToProps = state =>{
    return{
        usr: state.usr
    }
}

export default connect(mapStateToProps, null)(UsersList);