import { all, takeLatest, select, call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { IState } from '../..';
import api from '../../../services/api';
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './actions';
import { ActionTypes } from './types';

type CheckProductStockRquest = ReturnType<typeof addProductToCartRequest>

interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockRquest) {
  const { product } = payload;
  
  const currentQuantity: number = yield select((state: IState) => {
    return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
  });

  //o call serve para executar qualquer ação assincrona
  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

  if(availableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }

  console.log(currentQuantity);
}

//com o takelatest se a checagem anterior ainda nao finalizou, cancela as anteriores e pega a ultima
//com o takeevery pega faz todas as checagens dos clicks
//com o takeleading, descarta todas as que vieram depois da primeira
export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
]);