import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from "axios"

class UserItem extends Component {
  constructor(){
    super();
    this.state={
      pending:false,
      success:false
    }
    
    this.onInviteClick = this.onInviteClick.bind(this);
  }

  onInviteClick(e){
    this.setState({pending:true});
    const projectData = {
      project:this.props.project_id,
      user:this.props.user._id
    }
    axios.post('/api/members/invite',projectData)
    .then(res => {
            this.setState({pending:false});
            this.setState({success:true});
        }
    )
    .catch(err =>{            
          this.setState({pending:false});
        }
    )
  }

  render() {
    const {user,showInviteButton} = this.props;
    const {pending,success} = this.state;
    return (
      <div>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {user.name}
          <span className="">{showInviteButton && (
              <span>
                {success ? (
                  <button className="btn btn-secondary" disabled="true">
                    Invitation sended
                  </button>
                ) : (                  
                  <button className="btn btn-success" onClick={this.onInviteClick}disabled={pending}>
                  <i className="fa fa-envelope"></i> {pending ? "Loading...":"Undang"}
                </button>
                )}
              </span>
            )}</span>
        </li>
      </div>
    )
  }
}

UserItem.defaultProps = {
  showInviteButton: false
};

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
  };

export default UserItem;