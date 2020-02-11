<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info='item' />      
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem';

import Scroll from 'components/common/scroll/Scroll';

import {mapGetters} from 'vuex';

export default {
  name:'CartList',
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  // 进入购物车刷新一下购物车的高度
  activated() {
    this.$refs.scroll.refresh()
  },
}
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
  .content{
    height:100%;
  }
</style>
