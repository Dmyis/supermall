<template>
  <div id="home">
    <router-view></router-view>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners='banners' />
    <home-recommend-view :recommends='recommends' />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import HomeSwiper from './childcomps/HomeSwiper';
  import HomeRecommendView from './childcomps/HomeRecommendView';

  import {getHomeMultidata} from 'network/home';



export default {
  name:'Home',
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  //生命周期函数，组件一旦创建就会调用函数
  created() {
    //请求多个数据
    getHomeMultidata().then(res =>{
      // console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;

    })
  }
}
</script>

<style>
  .home-nav{
    background-color: var(--color-tint);
    color:#fff ;
  }
</style>