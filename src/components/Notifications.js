import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { colors } from '../misc/style';
import * as notificationActions from '../actions/notifications';

const notificationColours = {
  success: colors.green,
  error: colors.red,
};

const StyledNotifications = styled(motion.div)`
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

const Notifications = ({ notifications, actions }) => {
  const hideNotification = e => {
    e.stopPropagation();
    actions.hideNotification();
  };

  const variants = {
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
  };

  return (
    <StyledNotifications
      type={notifications.type}
      animate={notifications.active ? 'show' : 'hide'}
      variants={variants}
      onClick={hideNotification}
      onKeyDown={hideNotification}
    >
      {notifications.text}
    </StyledNotifications>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

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
