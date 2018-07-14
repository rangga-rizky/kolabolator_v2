import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment'

class CommentItem extends Component {

  render() {
    const { comment } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-12">          
            <p><strong>{comment.name}</strong> <small  className="text-muted">{moment(comment.date).fromNow()}</small></p>
            <p className="lead">{comment.text}</p>
           
          </div>
        </div>
      </div>
    );
  }
}


CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
 // auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
 // auth: state.auth
});

export default connect(mapStateToProps)(
  CommentItem
);
