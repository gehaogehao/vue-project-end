<template>
  <div class="line-wrap">
      <div class="line"></div>
      <slot></slot>
      <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      name:'ele-line'
  }
</script>

<style scoped lang="stylus">
.line-wrap
    display flex
    width 100%
    height 30px
    font-size 14px
    font-weight 700
    color rgb(255,255,255)
    align-items  center
    .line
        flex 1
        height 1px
        background-color rgba(255,255,255,.2)
    span 
        margin 0 12px    
</style>
