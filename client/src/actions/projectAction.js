import axios from "axios"
import {ADD_COMMENT,GET_DISCUSSION, GET_ERRORS ,GET_PROJECTS,GET_PROJECT,PROJECT_LOADING,CLEAR_ERRORS,ADD_PROJECT,PROJECT_PENDING} from './types'

export const getProjects = () => dispatch => {
    dispatch(setProjectLoading());
    axios.get('/api/projects')    
        .then(res => 
            dispatch({
                type:GET_PROJECTS,
                payload:res.data
            })
        )
        .catch(err =>
            dispatch({
                type:GET_PROJECTS,
                payload:null
            })
        )
}

export const addProject = (projectData) => dispatch => {
    dispatch(setProjectPending(true));
    dispatch(clearErrors());
    axios.post('/api/projects',projectData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
    .then(res => {
        dispatch({
            type:ADD_PROJECT,
            payload:res.data
        })
        dispatch(setProjectPending(false));
        }
    )
    .catch(err => {
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
            dispatch(setProjectPending(false));
         }
    )
}


export const getProject = (id) => dispatch => {
    dispatch(setProjectLoading());
    axios.get('/api/projects/'+id)    
        .then(res => 
            dispatch({
                type:GET_PROJECT,
                payload:res.data
            })
        )
        .catch(err =>
            dispatch({
                type:GET_PROJECT,
                payload:null
            })
        )
}

export const getDiscussion = (id) => dispatch => {
    dispatch(setProjectLoading());
    axios.get('/api/discussions/'+id)    
        .then(res => 
            dispatch({
                type:GET_DISCUSSION,
                payload:res.data
            })
        )
        .catch(err =>
            dispatch({
                type:GET_DISCUSSION,
                payload:null
            })
        )
}

export const addDiscussion = (discussionData) => dispatch => {
    dispatch(setProjectPending(true));
    dispatch(clearErrors());
    axios.post('/api/discussions',discussionData)
    .then(res => {
            dispatch(setProjectPending(false));
            dispatch(getProject(discussionData.project));
        }
    )
    .catch(err =>{
            dispatch(setProjectPending(false));
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        }
    )
}

export const addComment = (comment_data,discussion_id) => dispatch => {
    dispatch(setProjectPending(true));
    dispatch(clearErrors());
    axios.post('/api/discussions/comment/'+discussion_id,comment_data)
    .then(res => {
            dispatch(setProjectPending(false));
            dispatch({
                type:ADD_COMMENT,
                payload:res.data
            })
        }
    )
    .catch(err =>{
            dispatch(setProjectPending(false));
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        }
    )
}

export const addDiscussionLike = (id,project_id) => dispatch => {
    axios.post('/api/discussions/like/'+id)
    .then(res => 
        dispatch(getProject(project_id))
    )
    .catch(err =>
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    )
}

export const removeDiscussionLike = (id,project_id) => dispatch => {
    axios.post('/api/discussions/unlike/'+id)
    .then(res => 
        dispatch(getProject(project_id))
    )
    .catch(err =>
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    )
}

export const deleteDiscussion = () => {
}

export const clearErrors = () => {
    return {
        type:CLEAR_ERRORS
    }
}


export const setProjectLoading = () => {
    return {
        type:PROJECT_LOADING
    }
}

export const setProjectPending = (isPending) => {
    return {
        type:PROJECT_PENDING,
        payload:isPending
    }
}

