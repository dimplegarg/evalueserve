import axios from 'axios';

export const defaultLogin = () => {
    return dispatch => {
        dispatch({ type: "LOGIN" })
    }
}

export const handleApiLogin = (data) => {
    return (dispatch, getState) => {
        console.log(data, getState().LoginReducer);

        if (getState().LoginReducer.email === data.email && getState().LoginReducer.pwd === data.pwd) {
            dispatch({ type: "LOGIN_SUCCESS" })
        } else {
            dispatch({ type: "LOGIN_ERROR" })
        }
    }
}

export const handleGetUser = () => async dispatch => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        if (response && response.status === 200) {
            dispatch({ type: "USER_LIST", payload: response.data });
        }
    } catch (err) {
        console.log('error', err)
    }
}

export const handleUserAction = (name, username, idx, type, filterData = []) => async(dispatch, getState) => {
    let listUser = Object.assign([], getState().UserReducer.user);
    if (type === 'add') {
        let newUser = { name, username, id: listUser.length + 1 }
        listUser.unshift(newUser);
        dispatch({ type: "USER_LIST", payload: listUser });
    } else if (type === 'edit') {
        let newUser = { name, username, id: listUser[idx].id };
        listUser.splice(idx, 1, newUser);
        dispatch({ type: "USER_LIST", payload: listUser });
    } else if (type === 'filter') {
        dispatch({ type: "USER_FILTER", payload: filterData });
    } else {
        if (confirm('Are you sure? You want to delete this user!')) {
            listUser.splice(idx, 1);
            dispatch({ type: "USER_LIST", payload: listUser });
        }
    }
    return true;
}