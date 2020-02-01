<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" 
          class="tab-control-item"
          :class="{active: index===currentIndex}" @click="itemClick(index)">
          <!-- 设置文字高亮 -->
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      currentIndex:0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  },
}
</script>


<style>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 2.5rem;
    line-height: 2.5rem;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{ 
    padding: 5px;
  }
  .active{
    color: var(--color-high-text)
  }
  .active span{
    border-bottom: 2px solid var(--color-tint);
  }
</style>