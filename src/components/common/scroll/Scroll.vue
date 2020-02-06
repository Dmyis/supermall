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
  // 把props里面的属性传出去让父组件来决定是否使用
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
      // 配置上拉加载
      pullUpLoad:this.pullUpLoad
    })

    //2.监听滚动的位置
    // 只有再probeType为2或者3的使用才监听滚动
    if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',position =>{
        this.$emit('scroll', position)
      })
    }

    // 3.监听上拉加载更多
    // 判断是否为true，如果为true才使用上拉加载更多
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',() =>{
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    // 返回顶部
    scrollTo(x,y,time = 300) {
     this.scroll && this.scroll.scrollTo(x,y,time)
    },
    // 想要多次上拉加载更多
    finishPullUp() {
     this.scroll.finishPullUp();
    },
    // 图片加载完成就出现判断高度
    refresh() {      
      this.scroll &&  this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },  
}
</script>

<style scoped>

</style>>
