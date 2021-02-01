import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const setUser = (payload) => ({ type: "SET_USER", payload})

export const autoLogin = () => dispatch =>{
    const token = localStorage.getItem('token');
    if(token){
        axios.get(apiUrl + '/auth/steam/token/', {headers: {'Authorization': token}})
        .then(res =>{
            localStorage.setItem("token", res.data.token);
            dispatch(setUser(res.data.user));
        })
    }
}
