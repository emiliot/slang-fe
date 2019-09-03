import React from 'react';
import PropTypes from 'prop-types';
import { MESSAGE_SUCCESS, MESSAGE_DANGER, MESSAGE_WARNING } from '../constants';

const Message = ({ msg, type }) => <div>{msg}</div>;

Message.propTypes = {
  msg: PropTypes.string,
  type: PropTypes.oneOf([MESSAGE_SUCCESS, MESSAGE_DANGER, MESSAGE_WARNING]),
};

export default Message;
