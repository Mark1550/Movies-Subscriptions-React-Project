//the "reducer" function is used to store and update global states
function reducer(state = { user: {}, permissions:[], editUser: '', editMember:'',editMovie:'',refreshMovies:false, refresh: false }, action) {
    switch (action.type) {
        case "Save User":
            return ({ ...state, user: action.payload })
        case "Save User For Edit":
            return ({ ...state, editUser: action.payload })
        case "Save Member For Edit":
            return ({ ...state, editMember: action.payload })
        case "Save Movie For Edit":
            return ({ ...state, editMovie: action.payload })
        case "Save Permissions":
            return ({ ...state, permissions: action.payload })
        case "REFRESH":
            return ({ ...state, refresh: !state.refresh })
        case "REFRESH MOVIES":
            return ({ ...state, refreshMovies: !state.refreshMovies })
        default:
            return state;
    }
}
export default reducer;