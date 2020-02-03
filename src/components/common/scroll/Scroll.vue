<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>  
    </div> 
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
export default {
  name:'Scroll',
  data() {
    return {
      scroll:null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      // 不会每个scroll都需要上拉加载和监听滚动，把变量传出去让使用者决定
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })

    //2.监听滚动的位置
    this.scroll.on('scroll',position =>{
      this.$emit('scroll', position)
    })
    
    //3.上拉加载更多
    this.scroll.on('pullingUp',() =>{
      this.$emit('pullingUp')
    })
  },
  methods: {
    // 返回顶部
    scrollTo(x,y,time = 300) {
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    }
  },  
}
</script>

<style scoped>

</style>>
