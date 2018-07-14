import React, { Component } from 'react'
import PropTypes from 'prop-types';
//import classnames from 'classnames';
import DiscussionItem from '../project/DiscussionItem'

class DiscussionHeader extends Component {
  render() {
    const { discussion } = this.props;
    return (
       <DiscussionItem discussion={discussion} showActions={false} />
    )
  }
}

  
DiscussionHeader.propTypes = {
    discussion: PropTypes.object.isRequired,
};
  
  
export default  DiscussionHeader;
