<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>

    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods='goods'/>
      <detail-shop-info :shop='shop'/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad='imageLoad'/>
      <detail-param-info :param-info="paramInfo" />
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar';
  import DetailSwiper from './childComps/DetailSwiper';
  import DetailBaseInfo from './childComps/DetailBaseInfo';
  import DetailShopInfo from './childComps/DetailShopInfo';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo';
  import DetailParamInfo from './childComps/DetailParamInfo';

  import Scroll from 'components/common/scroll/Scroll';

  import {getDetail,Goods,Shop,GoodsParam} from 'network/detail';
export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll
  },
  data() {
    return {
      iid:null,
      topImages: [],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{}
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res =>{
      // 2.1保存详情所以数据
      const data = res.result;
      console.log(data);
      

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
    })
  },
  methods: {
    // DetailGoodsInfo里面的图片加载跟BScroll的滑动Bug修复
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  },
}
</script>

<style scoped>
  #detail{
    height: 100vh;
    position: relative;
    z-index: 10;
    background-color: #fff;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>>