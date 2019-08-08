import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as reducers from '../reducers';
import rootSaga from '../sagas';

const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware();

  const rootReducer = combineReducers({
    ...reducers,
  });

  const middlewares = [sagaMiddleware];

  if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require(`redux-logger`);

    middlewares.push(
      createLogger({
        collapsed: true,
      }),
    );
  }

  const enhancers = compose(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, preloadedState, enhancers);

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
