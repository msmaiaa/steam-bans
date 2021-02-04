import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchUser = async (data) =>{
    const token = localStorage.getItem('token');
    return axios.post(apiUrl + '/api/fetchProfile', {data: data}, {headers: {'Authorization': token}})
    .then((doc)=>{
        return {status: doc.status, user:doc.data.user};
    })
    .catch((error)=>{
        return {status: error.response.status};
    })
}

export const fetchObservedList = async () =>{
    const token = localStorage.getItem('token');
    return axios.get(apiUrl + '/api/getObservedUsersList', {headers: {'Authorization': token}})
    .then((doc)=>{
        return {status:doc.status, users: doc.data.docs}
    })
    .catch((error)=>{
        return {status: error.response.status}
    })
}

export const createUser = async (token) =>{
    axios.post(apiUrl + '/api/createUser', null, {headers: {'Authorization': token}})
    .catch((error)=>{
        console.error(error.response);
    })
}

export const deleteUser = async(steamid64) =>{
    const token = localStorage.getItem('token');
    return axios.delete(apiUrl + '/api/deleteObservedUser', {headers: {'Authorization': token}, data: {steamid64:steamid64}})
    .then((res)=>{
        return {status: res.status}
    })
    .catch((error)=>{
        return {status: error.response}
    })
}