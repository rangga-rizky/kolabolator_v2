import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import {setCurrentUser, logoutUser} from './actions/authAction'
import {clearCurrentProfile} from './actions/profileAction'
import setAuthToken from './utils/setAuthToken'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Dashboard from './components/dashboard/Dashboard'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import PrivateRoute from  './components/common/PrivateRoute'
import EditProfile from './components/edit-profile/EditProfile';
import CreateProfile from './components/create-profile/CreateProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Projects from './components/projects/Projects';
import Notifications from './components/notifications/Notifications';
import Project from './components/project/Project';
import InvitePage from './components/project/InvitePage';
import Discussion from './components/discussion/Discussion';

if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  const currentTIme = Date.now() / 1000;
  if(decoded.exp < currentTIme){
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>              
          <Route exact path="/" component={Landing}/>
          <div className="container">                  
          <Switch>  
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>          
              <PrivateRoute exact path="/create-profile" component={CreateProfile}/>            
              <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
              <PrivateRoute exact path="/add-experience" component={AddExperience}/>
              <PrivateRoute exact path="/add-education" component={AddEducation}/>   
              <PrivateRoute exact path="/feed" component={Projects}/>  
              <PrivateRoute exact path="/notifications" component={Notifications}/>               
              <PrivateRoute exact path="/projects/:id/invite" component={InvitePage}/> 
              <PrivateRoute exact path="/projects/:id" component={Project}/>        
              <PrivateRoute exact path="/discussions/:id" component={Discussion}/>              
              <Route exact path="/profiles" component={Profiles}/>
              <Route exact path="/profile/:handle" component={Profile}/>                   
              <Route exact path="/not-found" component={NotFound}/>
              <Route exact path="/*" component={NotFound}/>                       
          </Switch>      
          </div>    
          <Footer />
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
