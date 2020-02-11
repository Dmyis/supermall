<template>
  <div class="check-button" :class="{check:isCheck}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name:'CheckButton',
  props:{
    isCheck:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
  .check-button{
    border: 2px solid #aaa;
    border-radius: 50%;
  }
  .check{
    background-color: red;
    border-color: red;
  }
</style>