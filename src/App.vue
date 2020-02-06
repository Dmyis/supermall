<template>
  <div id="app" class="wrapper">
    <!-- exclude：排除组件 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'
  
  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style scoped>
  @import "assets/css/base.css";
</style>