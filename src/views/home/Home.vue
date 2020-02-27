<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 在这里多写一个tab-control是为了使用吸顶效果 -->
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" 
                    ref="tabControl1" class="tab-control-top"
                    v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type='3' @scroll ='contentScroll'
           :pull-up-load='true'
           @pullingUp='loadMore'>
      <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'/>
      <home-recommend-view :recommends='recommends' />
      <home-feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" 
                    ref="tabControl2"/>
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
  import TabControl from 'components/content/tabControl/TabConTrol';
  import GoodList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll';

  import {getHomeMultidata,getHomeGoods} from 'network/home';
  import {debounce} from 'common/utils';
  import {backTopMixin} from 'common/mixin';



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
  },
  mixins: [backTopMixin],
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
      isShowBack:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
      itemImgListener:null
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
  mounted() {
    // 1.接收GoodsListItem发送来的事件就行调用scroll的refresh方法，图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh,20)

    //2.对监听的事件进行保存
    this.itemImgListener = () =>{
      refresh();
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener) 
    this.$refs.scroll.refresh()
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
  },
  // 进入组件时
  activated() {
    // 根据离开的位置进入时不改变位置
    this.$refs.scroll.scrollTo(0,this.saveY,1)
    this.$refs.scroll.refresh()
  },
  // 离开组件时
  deactivated() {
    //1.记录滑动的位置
    this.saveY = this.$refs.scroll.getScrollY()

    //2.取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListener )
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    // 点击tab-control 来改变对应的高亮效果
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
      // 解决tab-control吸顶效果选项不一致的BUG
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;

    },
    //监听Scroll滚动 
    contentScroll(position) {
      //1.判断BackTop是否隐藏:通过混入的属性来判断
      this.listenShowBackTop(position)
      
      //2.判断决定tabControl是否吸顶（position：fixed）
      this.isTabFixed = (-position.y) > this.$refs.tabControl2.$el.offsetTop
    },
    // 上拉加载更多
    loadMore() {
      // 加载下一页数据
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      //2.获取tabControl的offsetTop
      //所以组件都有一个属性$el: 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
    // 把数据添加到goods里面并添加页数
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res=>{
        // 把数据添加到变量里面
        this.goods[type].list.push(...res.data.list) 
        this.goods[type].page +=1;    

        // 完成上拉加载更多后
        this.$refs.scroll.finishPullUp();
      })
    }
  },
}
</script>

<style scoped>
  #home{
    /* 使用了better-scroll后就可以再局部滚动了，所以就不需要padding支撑了 */
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color:#fff ;
    /* 再原生js下需要使用fixed,加入better-scroll后支持局部滚动所以就不需要了 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99; */
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
  }
  .tab-control-top{
    position: relative;
    z-index: 9;
  }
</style>