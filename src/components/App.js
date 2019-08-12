import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Global } from '@emotion/core';
import { globalStyle } from '../misc/style';
import Notifications from './Notifications';

const App = () => {
  return (
    <React.Fragment>
      <Global styles={globalStyle} />
      <Notifications />
      <div>It works!</div>
    </React.Fragment>
  );
};

export default hot(App);
