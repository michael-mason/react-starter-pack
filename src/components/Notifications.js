import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import posed from 'react-pose';
import styled from '@emotion/styled';
import { colors } from '../misc/style';
import * as notificationActions from '../actions/notifications';

const PosedNotifications = posed.div({
  show: {
    y: '-1vmax',
    transition: {
      type: 'spring',
      mass: 0.2,
      damping: 5,
    },
  },
  hide: {
    y: '-7vmax',
    transition: {
      type: 'spring',
      mass: 0.2,
      damping: 5,
    },
  },
});

const notificationColours = {
  success: colors.green,
  error: colors.red,
};

const StyledNotifications = styled(PosedNotifications)`
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99999;
  color: ${colors.white};
  font-family: 'roboto';
  font-size: 1.8vmax;
  font-weight: 700;
  height: 6vmax;
  line-height: 6.5vmax;
  text-align: center;
  background: ${props => notificationColours[props.type]};
`;

class Notifications extends React.Component {
  static propTypes = {
    notifications: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  hideNotification = e => {
    const { actions } = this.props;

    e.stopPropagation();
    actions.hideNotification();
  };

  render() {
    const { notifications } = this.props;

    return (
      <StyledNotifications
        type={notifications.type}
        pose={notifications.active ? 'show' : 'hide'}
        onClick={this.hideNotification}
        onKeyDown={this.hideNotification}
      >
        {notifications.text}
      </StyledNotifications>
    );
  }
}

const mapState = ({ notifications }) => ({
  notifications,
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators(notificationActions, dispatch),
});

export default connect(
  mapState,
  mapDispatch,
)(Notifications);
