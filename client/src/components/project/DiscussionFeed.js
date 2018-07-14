import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DiscussionItem from './DiscussionItem';

class DiscussionFeed extends Component {
  render() {
    const { discussions } = this.props;

    return discussions.map(discussion => <DiscussionItem key={discussion._id} discussion={discussion} />);
  }
}

DiscussionFeed.propTypes = {
  discussions: PropTypes.array.isRequired
};

export default DiscussionFeed;
