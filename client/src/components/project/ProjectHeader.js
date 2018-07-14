import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import classnames from 'classnames';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

class ProjectHeader extends Component {

  constructor(){
    super();
    this.state = {
      pending:false,
      isWaitingAccepted:false,
      errors:{}
    }
    this.onRequestClick = this.onRequestClick.bind(this);
  }

  componentDidMount(){
    if(this.props.isWaitingAccepted){
      this.setState({isWaitingAccepted:true})
    }else{      
      this.setState({isWaitingAccepted:false})
    }
  } 
  
  onRequestClick() {    
    this.setState({pending:true});
    const projectData = {
      project:this.props.project._id
    }
    axios.post('/api/members/request',projectData)
    .then(res => {
            this.setState({pending:false});
            this.setState({isWaitingAccepted:true});
        }
    )
    .catch(err =>{            
          this.setState({pending:false});
        }
    )
    
  }

  render() {
    const { project, auth, isMember } = this.props;
    const {pending,isWaitingAccepted } = this.state;
    return (
        <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2 text-center" >
            <a href="profile.html">
              { project.image ? (
                  <img
                  className=" d-none d-md-block"
                  src={"http://"+window.location.hostname+":5000/uploads/"+project.image}
                  alt=""
                />
              ): (
                <img
                className=" d-none d-md-block"
                src={"http://"+window.location.hostname+":5000/images/project.jpg"}
                alt=""
              />
              )}
            </a>
            <br />
            <span>{project.member.length} Member</span>
            </div>
          <div className="col-md-10">                    
            <span className="badge badge-secondary">{project.type}</span>
            <h5 className="lead">{project.title}</h5>
            <small className="text-muted">dibuat {moment(project.date).format('MMMM Do YYYY, h:mm:ss')}</small>
            <Link to={`/profile/${project.user._id}`} >
                <h6 className="text-muted"> by {project.user.name}</h6>
            </Link>
            <p>{project.text}</p>
            {isMember ? (
              <span>
                {project.user._id === auth.user.id ? (
                  <div>
                  <Link to={`/projects/${project._id}/invite`} className="btn btn-success">
                  <i className="fa fa-user"></i> {' '}
                   Undang Kolabolator
                  </Link>{' '}
                  <button className="btn btn-danger">
                  Close Project
                    </button>
                    </div>
                ) : null}
              </span>
            ) : (
                <span>
                  {isWaitingAccepted ? (
                    <button className="btn btn-secondary" disabled="true">
                       Waiting Accepted
                    </button>
                  ) : (
                    <button className="btn btn-success" onClick={this.onRequestClick} disabled={pending}>
                        <i className="fa fa-door-open"></i> Join Project
                    </button>)}
                </span>
            )}
          </div>
        </div>
      </div>
    )
  }
}

ProjectHeader.defaultProps = {
    isMember: false,
};
  
ProjectHeader.propTypes = {
    project: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};
  
const mapStateToProps = state => ({
   auth: state.auth,   
 });
  
export default connect(mapStateToProps, { /*deleteProject,addLike,removeLike*/})(
    ProjectHeader
);
