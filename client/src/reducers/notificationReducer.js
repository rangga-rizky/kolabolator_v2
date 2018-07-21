import {GET_NEW_NOTIFICATIONS,GET_NOTIFICATIONS,NOTIFICATION_LOADING} from '../actions/types'
const initialState = {
    unreadNotifications :[],
    notifications :[],
    loading:false
}

export default function(state = initialState,action){
    switch (action.type) { 
        case GET_NEW_NOTIFICATIONS:
            return {
                ...state,
                unreadNotifications:action.payload
            }         
        case GET_NOTIFICATIONS:
            return {
                ...state,
                notifications:action.payload,
                unreadNotifications:[],
                loading:false
            } 
        case NOTIFICATION_LOADING:
            return {
                ...state,
                loading:true
            }  
        default:
            return state;
    }
}