import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { ICartState } from './modules/cart/types';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

export interface IState {
  cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware( ...middlewares)
)); //valor inicial da store

sagaMiddleware.run(rootSaga);

export default store;