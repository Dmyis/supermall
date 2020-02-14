<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-botton-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import CartBottonBar from './childComps/CartBottonBar';

import CartList from './childComps/CartList';

import {mapGetters} from 'vuex';

export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    CartBottonBar
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength
    // }

    // 把getters里面的方法全部拿到计算属性里面来
    //方法1：名字要和getters名字相同
    // ...mapGetters(['cartLength']),

    //方法2:取自己的名字
    ...mapGetters({
      length:'cartLength'
    })
  },
}
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>>