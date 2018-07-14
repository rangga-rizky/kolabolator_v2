import {SET_CURRENT_USER,USER_PENDING} from '../actions/types' 
import isEmpty from '../utils/is-empty'

const initialState = {
    isAuthenticated : false,
    pending:false,
    user : {}
}

export default function(state = initialState,action){
    switch (action.type) {        
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated:!isEmpty(action.payload),
                user:action.payload
            };
        case USER_PENDING:
            return {
                ...state,
                pending:action.payload
            }  
        default:
            return state;
    }
}