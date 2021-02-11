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
    return axios.get(apiUrl + '/api/getTrackedUsersList', {headers: {'Authorization': token}})
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
export const getUserInfo = async () =>{
    const token = localStorage.getItem("token");
    return axios.get(apiUrl + '/api/getUserInfo', {headers: {'Authorization': token}})
    .then((res)=>{
        return {status: 200, user: res.data.user}
    })
    .catch((error)=>{
        console.error(error.response);
    })
}

export const createObservedUser = async(steamid64) =>{
    const token = localStorage.getItem('token');
    return axios.post(apiUrl + '/api/createTrackedUser', {steamid64: steamid64}, {headers: {'Authorization': token}})
    .then((res)=>{
        return {status: res.status}
    })
    .catch((error)=>{
        return {status: error.response.status}
    })
}

export const deleteUser = async(steamid64) =>{
    const token = localStorage.getItem('token');
    return axios.delete(apiUrl + '/api/deleteTrackedUser', {headers: {'Authorization': token}, data: {steamid64:steamid64}})
    .then((res)=>{
        return {status: res.status}
    })
    .catch((error)=>{
        return {status: error.response}
    })
}

export const checkInList = async(steamid64) =>{
    const token = localStorage.getItem('token');
    return axios.post(apiUrl + '/api/checkTrackedUser', {steamid64: steamid64}, {headers: {'Authorization': token}})
    .then((res)=>{
        if(res.data.isObserving){
            return true;
        }else{
            return false;
        }
    })
}

export const testHook = async(url) =>{
    const token = localStorage.getItem('token');
    return axios.post(apiUrl + '/discord/test', {discordHook: url}, {headers: {'Authorization': token}})
    .then((res)=>{
        return {status: res.status}
    })
    .catch((error)=>{
        return {status: error.response.status}
    })
}

export const updateUser = async(sendDiscord, discordHook) =>{
    const token = localStorage.getItem('token');
    return axios.patch(apiUrl + '/api/updateUser', {sendDiscord:sendDiscord, discordHook:discordHook}, {headers: {'Authorization': token}})
    .then((res)=>{
        return {status: res.status}
    })
    .catch((error)=>{
        return {status: error.response.status}
    })
}