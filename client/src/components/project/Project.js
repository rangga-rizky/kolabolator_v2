import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProjectHeader from '../project/ProjectHeader';
import DiscussionForm from '../project/DiscussionForm';
import DiscussionFeed from '../project/DiscussionFeed';
import Spinner from '../common/Spinner';
import { getProject } from '../../actions/projectAction';

class Project extends Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
  }

  render() {
    const { project, loading } = this.props.project;    
    let projectContent;

    if (project === null || loading || Object.keys(project).length === 0) {
      projectContent = <Spinner />;
    } else {
      projectContent = (
        <div>
        <ProjectHeader project={project.project} isMember={project.isMember} isWaitingAccepted={project.isWaitingAccepted}/>        
          {project.isMember ? (
              <DiscussionForm project_id={project.project._id}/> 
              )
              :(
                <div className="text-center">
                  <div className="alert alert-warning" role="alert">
                    Anda Harus Menjadi Member untuk melihat konten ini
                  </div>
                </div>
              )}
        <DiscussionFeed discussions={project.discussion}/>
        </div>
      );
    }

    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                <i className="fa fa-arrow-left"></i> Back To Feed
              </Link>
              {projectContent}              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Project.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProject })(Project);
