export default (state = {}, action) => {
    switch (action.type) {
        case "USER_LIST":
            return {
                ...state,
                user: (action && action.payload) ? action.payload : [],
                filterData: (action && action.payload) ? Object.assign([], action.payload) : [],
            }
        case "USER_FILTER":
            return {
                ...state,
                user: (action && action.payload) ? action.payload : [],
            }
        default:
            return state;
    }
}