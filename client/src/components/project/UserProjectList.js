import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserItem from '../user/UserItem'

class UserProjectList extends Component {
  render() {
    const {users} = this.props;
    return (
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            { users.map(user => <UserItem key={user._id} user={user} showInviteButton={true} project_id={this.props.project_id} />)}
          </ul>
        </div>
      </div>
    )
  }
}

UserProjectList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserProjectList;