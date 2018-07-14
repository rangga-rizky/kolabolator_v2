import axios from "axios"
import {GET_ERRORS , SET_CURRENT_USER,USER_PENDING} from './types'
import {clearCurrentProfile} from './profileAction'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

export const registerUser = (userData,history) => dispatch => {
    dispatch(setUserPending(true));
    axios.post('/api/users/register',userData)
    .then(res =>{
        dispatch(setUserPending(false));
        history.push('/login')
    }).catch(err =>
        {
            dispatch(setUserPending(false));
            dispatch({
                type : GET_ERRORS,
                payload: err.response.data
            })  
        } 
    );
};

export const loginUser = (userData,history) => dispatch => {
    dispatch(setUserPending(true));
    axios.post('/api/users/login',userData)
    .then(res =>{
        dispatch(setUserPending(false));
        const {token} = res.data;
        localStorage.setItem('jwtToken',token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
      //  history.push('/login')
    }).catch(err =>
        {
            dispatch(setUserPending(false));
            dispatch({
                type : GET_ERRORS,
                payload: err.response.data
            })   
        }
    );
};

export const setCurrentUser = decoded => {
    return {
        type : SET_CURRENT_USER,
        payload: decoded
    }
}

export const setUserPending = (isPending) => {
    return {
        type:USER_PENDING,
        payload:isPending
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    dispatch(clearCurrentProfile());
}