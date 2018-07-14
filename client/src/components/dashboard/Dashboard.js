import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Spinner from '../common/Spinner'
import ProfileAction from './ProfileAction'
import {getCurrentProfile,deleteAccount } from '../../actions/profileAction'
import Experience from './Experience'
import Education from './Education'

class Dashboard extends Component {
  componentDidMount(){
    this.props.getCurrentProfile();
  }

  onDeleteClick(e){
    this.props.deleteAccount();
  }
  
  render() {
    const {user} = this.props.auth;
    const {profile,loading} = this.props.profile;

    let dashboardContent;

    if(profile === null || loading){
      dashboardContent = <Spinner/>;
    }else{
      if(Object.keys(profile).length > 0){
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {' '}
            <Link to={'/profile/'+profile.handle}>
              {user.name}
            </Link> ({user.userType})</p> 
            <ProfileAction />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{marginBottom: '60px'}}>
              <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
                Delete My Account
              </button>
            </div>
          </div>
        );
      }else{
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome {user.name} ({user.userType})
            </p>
            <p>Kamu Belum Membuat Profile , Buat Sekarang dan Mulai Kolaborasi dengan Dunia</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">Buat Profile</Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth:state.auth,
  profile:state.profile
});


export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);