import { select, put, takeEvery, delay } from 'redux-saga/effects';
import * as notificationActions from '../actions/notifications';

function* showNotifications(action) {
  if (!action.payload.persist) {
    if (action.payload.type === 'success') {
      yield delay(2000);
    } else {
      yield delay(5000);
    }

    if (yield select((state) => state.notifications.active)) {
      yield put(notificationActions.hideNotification());
    }
  }
}

export default function* watchNotifications() {
  yield takeEvery(notificationActions.NOTIFICATION_SHOW, showNotifications);
}
