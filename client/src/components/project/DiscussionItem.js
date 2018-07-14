import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { deleteDiscussion,addDiscussionLike,removeDiscussionLike } from '../../actions/projectAction';

class DiscussionItem extends Component {
  onDeleteClick(id) {
  //  this.props.deleteDiscussion(id);
  }

  onLikeClick(id,project_id) {
    this.props.addDiscussionLike(id,project_id);
  }

  onUnlikeClick(id,project_id) {
    this.props.removeDiscussionLike(id,project_id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { discussion, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={discussion.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{discussion.name}</p><br/>
          </div>
          <div className="col-md-10">
            <p className="lead">{discussion.text} <br/>
            <small >dibuat {moment(discussion.date).format('MMMM Do YYYY, h:mm:ss')}</small></p>            
            
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, discussion._id,discussion.project)}
                  type="button"
                  className="btn btn-light mr-1"           
                  disabled={ this.findUserLike(discussion.likes)}       
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(discussion.likes)
                    })}
                  />
                  <span className="badge badge-light">{discussion.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, discussion._id,discussion.project)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/discussions/${discussion._id}`} className="btn btn-info mr-1">
                  Lihat Komentar
                </Link>
                {discussion.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, discussion._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

DiscussionItem.defaultProps = {
  showActions: true
};

DiscussionItem.propTypes = {
  discussion: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteDiscussion: PropTypes.func.isRequired,
  addDiscussionLike: PropTypes.func.isRequired,
  removeDiscussionLike: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteDiscussion,addDiscussionLike,removeDiscussionLike })(
  DiscussionItem
);
