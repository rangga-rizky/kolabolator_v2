import { combineReducers } from "redux"
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import profileReducer from './profileReducer'
import postReducer from './postReducer'
import projectReducer from './projectReducer'
import notificationReducer from './notificationReducer'

export default combineReducers({
    auth : authReducer,
    profile : profileReducer,
    errors : errorReducer,
    post : postReducer,
    project : projectReducer,
    notification: notificationReducer
});
