import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux';
import { getNotif } from '../../actions/notificationAction';
import NotificationFeed from './NotificationFeed';

class Notifications extends Component {
  componentDidMount() {
    this.props.getNotif();
  }

  render() {
    const { notifications, loading } = this.props.notification;
    let notifContent;

    if (notifications === null || loading) {
      notifContent = <Spinner />;
    } else {
        notifContent = <NotificationFeed notifications={notifications} />
    }
    return (
        <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            <h1>Notifikasi</h1>
              {notifContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Notifications.propTypes = {
  getNotif: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notification: state.notification
});

export default connect(mapStateToProps, { getNotif })(Notifications);