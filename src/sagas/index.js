import { fork } from 'redux-saga/effects';
import watchNotifications from './watchNotifications';

export default function* root() {
  yield fork(watchNotifications);
}
