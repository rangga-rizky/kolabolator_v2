import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import classnames from 'classnames';
import { Link } from 'react-router-dom';
//import { deleteProject,addLike,removeLike } from '../../actions/projectAction';

class ProjectItem extends Component {
  onDeleteClick(id) {
    //this.props.deleteProject(id);
  }

  onLikeClick(id) {
    //this.props.addLike(id);
  }

  onUnlikeClick(id) {
    //this.props.removeLike(id);
  }


  render() {
    const { project} = this.props;

    return (
    <div className="col-sm-3">
      <div className="card" >
        <div className="card-body">
          <span className="badge badge-secondary">{project.type}</span>
          <h5 className="card-title">{project.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">by {project.user.name}</h6>
          <p className="card-text">
          {project.text.length > 40 ? project.text.substring(0, 40)+"..." : project.text}
          </p>
          <Link to={`/projects/${project._id}`} className="btn btn-info mr-1">
                <i className="fa fa-eye"></i>  View Project
            </Link>
        </div>
      </div>
    </div>
    );
  }
}

ProjectItem.defaultProps = {
  showActions: true
};

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
 // deleteProject: PropTypes.func.isRequired,
 // addLike: PropTypes.func.isRequired,
 // removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { /*deleteProject,addLike,removeLike*/})(
  ProjectItem
);
