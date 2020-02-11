import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types';

export default {
  // mutations唯一的目的就是修改state的状态
  [ADD_COUNTER](state,payload) {
    payload.count+=1
  },
  [ADD_TO_CART](state,payload) {
    // 在vux模型里面保存商品选中状态
    payload.checked = true;
    state.cartList.push(payload)
  }
}