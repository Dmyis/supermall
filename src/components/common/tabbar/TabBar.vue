  <template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'TabBar'
}
</script>

<style>

  #tab-bar{
    display: flex;
    background-color: #ddd;
    position: fixed;
    left: 0;
    right: 0;
    bottom: -2px;
    z-index: 9;
    box-shadow: 0 -3px 1px rgba(100,100,100,.05);
}

</style>