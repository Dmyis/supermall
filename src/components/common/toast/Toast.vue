<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  data() {
    return {
      message:'',
      isShow:false
    }
  },
  // toast第四步:设置show方法,并写入对应的代码
  methods: {
    show(message='默认内容',duration=2000) {
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration);
    }
  },
}
</script>
  
<style scoped>
  .toast{
    position: fixed;
    left: 50%;
    top: 50%;
    color: #fff;
    z-index: 999;
    padding: 8px 10px;
    border-radius: 3px;
    transform:translate(-50%, -50%);
    background-color: rgba(0,0,0,.7)
  }
</style>