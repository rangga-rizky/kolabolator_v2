import axios from "axios"
import {GET_ERRORS ,SET_CURRENT_USER, GET_PROFILE,GET_PROFILES,PROFILE_PENDING, PROFILE_LOADING,CLEAR_CURRENT_PROFILE} from './types'

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('/api/profiles')
        .then( res => {
            dispatch({
                type:GET_PROFILE,
                payload:res.data
            })
        })
        .catch(err => {
            dispatch({
                type:GET_PROFILE,
                payload:{}
            })
        })
}

export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profiles/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

export const createProfile = (profileData, history) => dispatch => {
    dispatch(setProfilePending(true));
    axios
      .post('/api/profiles', profileData)
      .then(res => 
        {
          dispatch(setProfilePending(false));
          history.push('/dashboard')
        }
      )
      .catch(err => {
        dispatch(setProfilePending(false));
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }        
      );
  };

  export const addExperience = (expData, history) => dispatch => {
    axios
      .post('/api/profiles/experience', expData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  export const addEducation = (eduData, history) => dispatch => {
    axios
      .post('/api/profiles/education', eduData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };


export const deleteAccount = () => dispatch =>{
    if(window.confirm("Apakah anda yakin ?")){
        axios.delete('/api/profiles')
            .then(res => 
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                }))
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
        )
    }
}

export const deleteExperience = (id) => dispatch => {
    if(window.confirm("Apakah anda yakin ?")){
        axios
          .delete('/api/profiles/experience/'+id)
          .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
          }))
          .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
          );
    }
};

export const deleteEducation = (id) => dispatch => {
    if(window.confirm("Apakah anda yakin ?")){
        axios
          .delete('/api/profiles/education/'+id)
          .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
          }))
          .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
          );
    }
};

export const setProfileLoading = () => {
    return {
        type:PROFILE_LOADING
    }
}

export const clearCurrentProfile = () => {
    return {
        type:CLEAR_CURRENT_PROFILE
    }
}

export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios
      .get('/api/profiles/all')
      .then(res =>
        dispatch({
          type: GET_PROFILES,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_PROFILES,
          payload: null
        })
      );
  };

  export const setProfilePending = (isPending) => {
    return {
        type:PROFILE_PENDING,
        payload:isPending
    }
}