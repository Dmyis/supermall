<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav" />

    <scroll class="content" ref="scroll" :probeType='3' @scroll='contentScroll'>
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods='goods'/>
      <detail-shop-info :shop='shop'/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad='imageLoad'/>
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top  @click.native='backTop' v-show="isShowBack"/>
    <detail-botton-bar @addCart='addToCart'/>
    <!-- <toast :message='message' :show='show'/> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar';
  import DetailSwiper from './childComps/DetailSwiper';
  import DetailBaseInfo from './childComps/DetailBaseInfo';
  import DetailShopInfo from './childComps/DetailShopInfo';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo';
  import DetailParamInfo from './childComps/DetailParamInfo';
  import DetailCommentInfo from './childComps/DetailCommentInfo';
  import GoodsList from 'components/content/goods/GoodsList';
  import DetailBottonBar from './childComps/DetailBottonBar';
  // import Toast from 'components/common/toast/Toast';

  import Scroll from 'components/common/scroll/Scroll';

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail';
  import {backTopMixin} from 'common/mixin';

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottonBar,
    Scroll,
    // Toast
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid:null,
      topImages: [],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTops:[],
      currentIndex:0,
      // message:'',
      // show:false
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res =>{
      // 2.1保存详情所以数据
      const data = res.result;
   
      // 2.2.获取顶部图片和轮播数据
      this.topImages = data.itemInfo.topImages;

      // 2.3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 2.4.获取店铺信息
      this.shop = new Shop(data.shopInfo)      

      // 2.5.获取商品详情数据
      this.detailInfo = data.detailInfo;

       // 2.6.获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);

      // 2.7 保存评论信息：如果有就保存
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
        // offsetTop的值不对
    /*   this.$nextTick(()=>{
        // 根据最新的数据，对应的Dom被渲染出来了但是图片没有加载出来
        //offsetTop的高度不包括图片的高度
        // offsetTop值不对，一般都是图片的问题
        this.themeTops = [];

        this.themeTops.push(0)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)

        console.log(this.themeTops);
      }) */
    })
   
    //3.请求推荐数据
    getRecommend().then(res =>{
      this.recommends = res.data.list;
    })
  },
  mounted() {
    // this.themeTops.push(0)
    // this.themeTops.push(this.$refs.param.$el.offsetTop)
    // this.themeTops.push(this.$refs.comment.$el.offsetTop)
    // this.themeTops.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTops);
  },
  methods: {
    // DetailGoodsInfo里面的图片加载跟BScroll的滑动Bug修复
    imageLoad() {
      this.$refs.scroll.refresh()  

      // 获取每个主题的offsetTop
      // 因为事件发送过来的时候已经判断了图片加载完了
      // 有点问题：为什么需要-50
      this.themeTops.push(0)
      this.themeTops.push(this.$refs.param.$el.offsetTop - 50)
      this.themeTops.push(this.$refs.comment.$el.offsetTop - 50)
      this.themeTops.push(this.$refs.recommend.$el.offsetTop - 50)
      // 在最后添加一个最大值
      this.themeTops.push(Number.MAX_VALUE)
    },
    //点击navbar滑动到指定的位置
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTops[index],500)
    },
    contentScroll(position) {
      // 1.获取y值
      let positionY = -position.y
      const length = this.themeTops.length;
      // positionY在 0 和 7000之间 index = 0
      // positionY在 7000 和 8000之间 index = 1
      // positionY在 8000 和 8500之间 index = 2
      // positionY超过 8500 和非常大值之间  index = 3
    // 判断y值滑动到什么区间了就判断一些就改变标题
      for (let i = 0; i < length-1; i++) {        
        if((this.currentIndex !== i) && (positionY >= this.themeTops[i] && positionY < this.themeTops[i+1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      } 
      //2.判断BackTop是否隐藏：:通过混入的属性来判断
      this.listenShowBackTop(position)
    },
    // 添加到购物车
    addToCart() {
      // 1.获取购物车所需要的信息
      const product = {};
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      product.iid = this.iid
      
      //2.将商品加入到购物车
      this.$store.dispatch('addCart',product).then(res =>{
        // this.message = res
        // this.show = true
        
        // setTimeout(() => {
        //   this.show = false
        // }, 1500);
       this.$toast.show(res,2000)       
      })  

    }
  },

}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 10;
    height: 100vh;
    background-color: #fff;
    overflow: hidden;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 102px);
  }
</style>>