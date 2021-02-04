

const initialState = {
    user: {},
    loggedIn: false
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case "SET_USER":
            return{
                loggedIn: true,
                user: {...action.payload}
            }
        case "LOGOUT_USER":
            localStorage.removeItem("token");
            return{
                loggedIn: false,
                user: {}
            }
        default:
            return state;
    }
    
}

export default reducer;