<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content" ref="scroll" :probe-type='3' @scroll ='contentScroll'
           :pull-up-load='true' @pullingUp='loadMore'>
      <home-swiper :banners='banners' />
      <home-recommend-view :recommends='recommends' />
      <home-feature-view />
      <tab-control  class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
      <good-list :goods="showGoods" />
    </scroll>
    <!-- 给组件添加点击事件 -->
    <back-top  @click.native='backTop' v-show="isShowBack"/>

  </div>
</template>

<script>
  import HomeSwiper from './childcomps/HomeSwiper';
  import HomeRecommendView from './childcomps/HomeRecommendView';
  import HomeFeatureView from './childcomps/HomeFeatureView';

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll';
  import BackTop from 'components/content/backTop/BackTop';

  import {getHomeMultidata,getHomeGoods} from 'network/home';



export default {
  name:'Home',
  components:{
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [], 
      recommends: [],
      // 存放商品数据
      goods:{
        'pop': {page:0, list:[]},
        'new': {page:0, list:[]},
        'sell': {page:0, list:[]}
      },
      currentType:'pop',
      isShowBack:false
    }
  },
  //生命周期函数，组件一旦创建就会调用函数
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
    },
    //通过refs获取组件，使用该组件内的方法
    backTop() {
      this.$refs.scroll.scrollTo(0,0 )
    },
    // backTop的显示隐藏
    contentScroll(position) {
      this.isShowBack = (-position.y) > 1000
    },
    loadMore() {
      // 上拉添加数据
      this.getHomeGoods(this.currentType)
    },


    /**
     *  关于网络请求的方法
    */
    getHomeMultidata() {
      getHomeMultidata().then(res =>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      }) 
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res=>{
        // 把数据添加到变量里面
        this.goods[type].list.push(...res.data.list) 
        this.goods[type].page +=1;    

        //上拉加载更多
        this.$refs.scroll.finishPullUp();
      })
    }
  },
}
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color:#fff ;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99;
  }
  /* 吸顶属性 */
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
  }
</style>