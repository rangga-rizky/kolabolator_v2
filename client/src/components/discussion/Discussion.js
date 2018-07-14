import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DiscussionHeader from '../discussion/DiscussionHeader';
import CommentForm from '../discussion/CommentForm';
import CommentFeed from '../discussion/CommentFeed';
import Spinner from '../common/Spinner';
import { getDiscussion } from '../../actions/projectAction';

class Discussion extends Component {
  componentDidMount() {
    this.props.getDiscussion(this.props.match.params.id);
  }

  render() {
    const { discussion, comments, loading } = this.props.project;
    let discussionContent;

    if (discussion === null || loading || Object.keys(discussion).length === 0) {
      discussionContent = <Spinner />;
    } else {
      discussionContent = (
        <div>
          <DiscussionHeader discussion={discussion}/>
          <CommentForm discussion_id={discussion._id}/>
          <div className="col-md-8"> 
            <CommentFeed comments={comments}/>
          </div>
        </div>
      );
    }

    return (
      <div className="discussion">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {discussionContent}              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Discussion.propTypes = {
  getDiscussion: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(mapStateToProps, { getDiscussion })(Discussion);
