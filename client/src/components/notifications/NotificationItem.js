import React from 'react';
import {Link} from 'react-router-dom'

const NotificationItem =  (props) => {
  const {notification} = props;  
  let notifContent;
  if(notification.type === "INVITATION"){
    notifContent = ( <Link className="dropdown-item" to={`/projects/${notification.data.project_id}`}>
                    <p>{notification.data.by} Mengundang anda bergabung ke {notification.data.project_name}</p>
                    </Link> )
  }else if(notification.type === "REQUEST_MEMBER"){
    notifContent = ( <Link className="dropdown-item" to={`/projects/${notification.data.project_id}`}>
                    <p>{notification.data.by} Meminta bergabung ke {notification.data.project_name}</p>
                    </Link> )
  }
      
  return (
    <div className="card card-body mb-3">
        <div className="row">
            <div className="col-md-12">
                {notifContent}
            </div>
        </div>
    </div>
  )
}

export default NotificationItem;
