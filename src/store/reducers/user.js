

const initialState = {
    user: {},
    loggedIn: false,
    isLoading: true
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case "SET_USER":
            return{
                loggedIn: true,
                isLoading: false,
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