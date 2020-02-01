<template>
  <div id="home">
    <router-view></router-view>
    <nav-bar></nav-bar>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';

export default {
  name:'Home',
  components:{
    NavBar
  }
}
</script>

<style>

</style>