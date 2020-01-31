<template>
  <div class="tab-bar-item" @click='itemClick'>
    <!-- 如果活跃就显示item-icon -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- 动态绑定style -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props: {
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  computed: {
    isActive() {
      //如果我点击的path == url的path就为true
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      //如果是活跃的就变为设定的颜色，如果没有设定就是默认颜色
      return this.isActive? {color:this.activeColor}:{}
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path)
    }
  },
 }
</script>

<style>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px
  }
</style>