import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types';

export default {
  addCart(context,payload){
    return new Promise((resolve,reject) =>{
      // payload新添加的商品
        // 1.查找之前数组是否又有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid );
        // 2.判断oldProduct如果有该商品数量就加一
        if(oldProduct){
          // oldProduct.count+=1      不能在actions里面直接修改state的状态
          context.commit(ADD_COUNTER,oldProduct)
          resolve('当前数量+1')
        }else{
          payload.count = 1
          // context.state.cartList.push(payload);       
          context.commit(ADD_TO_CART,payload)
          resolve('成功加入购物车')
        }
    })
  }
}