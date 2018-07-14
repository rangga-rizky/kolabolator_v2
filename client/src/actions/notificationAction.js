import axios from "axios"
import {GET_NEW_NOTIFICATIONS,NOTIFICATION_LOADING, GET_NOTIFICATIONS} from './types'

export const getNewNotif = () => dispatch => {
    axios.get('/api/notifications/new')    
        .then(res => 
           dispatch({
                type:GET_NEW_NOTIFICATIONS,
                payload:res.data
            })
        )
        .catch(err =>
            dispatch({
                type:GET_NEW_NOTIFICATIONS,
                payload:null
            })
        )
}


export const getNotif = () => dispatch => {
    dispatch(setNotifLoading());
    axios.get('/api/notifications')    
        .then(res => 
           dispatch({
                type:GET_NOTIFICATIONS,
                payload:res.data
            })
        )
        .catch(err =>
            dispatch({
                type:GET_NOTIFICATIONS,
                payload:null
            })
        )
}

export const setNotifLoading = () => {
    return {
        type:NOTIFICATION_LOADING
    }
}