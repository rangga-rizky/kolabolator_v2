import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNewNotif } from '../../actions/notificationAction';
import Notification from './Notification'

class NotificationList extends Component {
  componentDidMount() {
    this.props.getNewNotif();
  }

  render() {
    const { unreadNotifications } = this.props.notification;
    let notifContent;
    console.log(unreadNotifications);
    if(unreadNotifications != null){
      notifContent = unreadNotifications.map(notif =>
         <Notification key={notif._id}
                       type={notif.type}
                       by={notif.data.by}
                       project_name={notif.data.project_name} />)
    }
    return (
        <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="fa fa-bell"></i>
          {unreadNotifications.length > 0 && <span className="badge badge-danger navbar-badge">!</span>}
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          {notifContent}
          <Link className="dropdown-item" to="/notifications">
            Lihat semua Notifikasi
          </Link>
        </div>
      </li>
    )
  }
}

NotificationList.propTypes = {
  getNewNotif: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notification: state.notification
});

export default connect(mapStateToProps, { getNewNotif })(NotificationList);