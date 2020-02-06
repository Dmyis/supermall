<template>
  <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageImg">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
    //默认地址为index
  import {Swiper,SwiperItem} from 'components/common/swiper';

export default {
  name:'HomeSwiper',
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      isLoad:false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods: {
    // 只发送一次得到一张图片的高度就行了
    imageImg() {
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  },
}
</script>

<style>

</style>