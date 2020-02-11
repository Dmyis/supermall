import BackTop from 'components/content/backTop/BackTop';

export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBack:false, 
    }
  },
  methods: {
    //通过refs获取组件，使用该组件内的方法
    backTop() {
      this.$refs.scroll.scrollTo(0,0 )
    },
    
    //1.判断BackTop是否隐藏:通过混入的属性来判断
    listenShowBackTop(position){
      this.isShowBack = (-position.y) > 1000
    }
  },
}