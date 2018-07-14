import {ADD_COMMENT,GET_PROJECTS,PROJECT_LOADING,ADD_PROJECT,PROJECT_PENDING,GET_PROJECT,GET_DISCUSSION} from '../actions/types'
const initialState = {
    projects :[],
    project:{},
    discussion:{},
    comments:[],
    loading:false,
    pending:false
}

export default function(state = initialState,action){
    switch (action.type) { 
        case GET_PROJECTS:
            return {
                ...state,
                projects:action.payload,
                loading:false
            } 
         case GET_PROJECT:
            return {
                ...state,
                project:action.payload,
                loading:false
            }
        case GET_DISCUSSION:
            return {
                ...state,
                discussion:action.payload.discussion,
                comments:action.payload.comments,
                loading:false
            }  
        case PROJECT_LOADING:
            return {
                ...state,
                loading:true
            }   
        case PROJECT_PENDING:
            return {
                ...state,
                pending:action.payload
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects:[action.payload, ...state.projects]
            } 
        case ADD_COMMENT:
            return {
                ...state,
                comments:[action.payload, ...state.comments]
            } 
        default:
            return state;
    }
}