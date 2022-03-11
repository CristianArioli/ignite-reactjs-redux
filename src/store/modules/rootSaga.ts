import { all } from 'redux-saga/effects';

import cart from './cart/sagas';

export default function* rootSaga() { //function* é um generator, é como um async
  yield all([
    cart,
  ]) //yield é como um await
}