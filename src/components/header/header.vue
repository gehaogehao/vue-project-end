<template>
  <header class="header">
    <slot name="left"></slot>
    <a class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </a>
    <slot name="right"></slot>
  </header>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Header",
  props:{
      title:String
  }
};
</script>

<style scoped lang='stylus'>
.header
  background-color #02a774
  position fixed
  z-index 100
  left 0
  top 0
  width 100%
  height 45px
  .header_title
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 50%
    color #fff
    text-align center
    .header_title_text
      font-size 20px
      color #fff
      display block
</style>
