import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchUser = async (data) =>{
    const token = localStorage.getItem('token');
    return axios.post(apiUrl + '/api/fetchObservedUser', {data: data}, {headers: {'Authorization': token}})
    .then((doc)=>{
        return {status: '200', user:doc.data.user};
    })
    .catch((error)=>{
        return {status: '422'};
    })
}

