<template>
   <div class="bottom-menu">
    <check-button class="select-all" :isCheck='isSelectAll' @click.native="checkClick"/>
    <span>全选</span>
    <span class="total-price">合计: ¥ {{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{checkLength}})</span>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton';

// 导入getters
import {mapGetters} from 'vuex';
export default {
  name:'CartBottonBar',
  components:{
    CheckButton
  },
  computed: {
    // 使用getters里面的内容
    ...mapGetters(['cartList']),
    // 计算总价：
     totalPrice() {
      //  使用filter过滤掉选中的商品
        return this.cartList.filter(item => {
          return item.checked
          // 在把商品的价格加起来
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
      },
      // 计算个数：
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      // 全选
      isSelectAll() {
        //判断全部选中
          //没有数据就不选中
          if(this.cartList.length === 0) return false

          //1.使用filter
          return !(this.cartList.filter(item => !item.checked).length) 

          //2.使用find
          // return !this.cartList.find(item => !item.checked) 

          //3.普通遍历
          // for( let item of this.cartList ){
          //   if(!item.checked){
          //     return false
          //   }
          // }
          // return true
      }
  },
  methods: {
    checkClick() {
     if(this.isSelectAll){  //全部被选中
       this.cartList.forEach(item => item.checked = false)
     }else{   //部分被选中
       this.cartList.forEach(item => item.checked = true)
     }
    },
    calcClick(){
      // 如果没有选中商品就弹框
      if(!this.isSelectAll){
        this.$toast.show('您还没有选中商品',2000)
      }
    }
  },
}
</script>

<style>
   .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }
  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }
  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }
  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>