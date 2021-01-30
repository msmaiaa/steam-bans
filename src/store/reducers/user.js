

const initialState = {
    user: {},
    loggedIn: false
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case "SET_USER":
            console.log(action.payload);
            return{
                loggedIn: true,
                user: {...action.payload}
            }
    }
    return state;
}

export default reducer;