import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import axios from 'axios'

class NotificationItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      pending:false,
      isRead:false,
    }
    this.onAcceptInvitation = this.onAcceptInvitation.bind(this);
    this.onAcceptRequest = this.onAcceptRequest.bind(this);
  }

  componentDidMount() {
    this.setState({isRead:this.props.notification.isRead});
  }  

  onAcceptInvitation(){
    this.setState({pending:true});
    const member = {
     id : this.props.notification.data.member_id,
     notification_id : this.props.notification._id,
   }
    axios.post('api/members/invite/accept',member)
    .then(res =>{       
       this.setState({pending:false,isRead:true});
    }).catch(err =>
        {           
         this.setState({pending:false}); 
        } 
    );
  }

  onAcceptRequest(){
   this.setState({pending:true});
   const member = {
    id : this.props.notification.data.member_id,
    notification_id : this.props.notification._id,
  }
   axios.post('api/members/request/accept',member)
   .then(res =>{       
      this.setState({pending:false,isRead:true});
   }).catch(err =>
       {           
        this.setState({pending:false}); 
       } 
   );
  }

  render() {
    const {notification} = this.props;  
    let notifContent;
    if(notification.type === "INVITATION"){
      notifContent = ( <div><Link className="dropdown-item" to={`/projects/${notification.data.project_id}`}>
                      <p>{notification.data.by} Mengundang anda bergabung ke {notification.data.project_name}</p>
                      </Link>
                      {!this.state.isRead &&  <button disabled={this.state.pending} className="btn btn-success" onClick={this.onAcceptInvitation}>
                          Terima undangan
                      </button>} </div>)
    }else if(notification.type === "REQUEST_MEMBER"){
      notifContent = ( <div><Link className="dropdown-item" to={`/projects/${notification.data.project_id}`}>
                      <p>{notification.data.by} Meminta bergabung ke {notification.data.project_name}</p>
                      </Link>
                      {!this.state.isRead &&  <button disabled={this.state.pending} className="btn btn-success" onClick={this.onAcceptRequest}>
                          Terima permintaan
                      </button>}
                     </div> )
    }

    return (
      <div>        
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-12">
                    {notifContent}
                </div>
            </div>
        </div>
      </div>
    )
  }
}


export default NotificationItem;
