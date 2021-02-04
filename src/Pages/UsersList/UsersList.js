import React, {useEffect, useLayoutEffect} from 'react';
import {connect} from 'react-redux';

const UsersList = (props) =>{

    return(
        <div>
            UsersList
        </div>
    )


}



const mapStateToProps = state =>{
    return{
        usr: state.usr
    }
}

export default connect(mapStateToProps, null)(UsersList);