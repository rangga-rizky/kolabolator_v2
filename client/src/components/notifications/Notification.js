import React from 'react'

const Notification =  (props) => {
  let message = "";
  if(props.type === "INVITATION"){
    message = props.by+" Mengundang anda bergabung ke "+props.project_name;
  }else if(props.type === "REQUEST_MEMBER"){
    message = props.by+" Meminta bergabung ke "+props.project_name;
  }
  return (
    <span>
       <button className="dropdown-item" >
           <p><i className="fa fa-envelope mr-2"></i> {message}</p>
       </button>   
        <div className="dropdown-divider"></div>   
    </span>  
  )
}

export default Notification;
