<template>
  <div class="list">
      <ul>
          <li v-for="(item, index) in supports" :key="index">
              <ele-icon :size='2' :type='item.type' class="icon"></ele-icon>
              <span>{{item.content}}</span>
          </li>
      </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import icon from 'components/ele-icon/ele-icon.vue'
  export default {
      name:'ele-list',
      props:{
          supports:Array
      },
      components:{
          'ele-icon':icon
      }
  }
</script>

<style scoped lang="stylus">
ul
  padding-left 12px 
  margin-top 24px
  li
    height 16px
    font-size 12px
    font-weight 200
    color rgb(255,255,255)
    line-height 12px
    margin-bottom 12px
    &:last-child
        margin-bottom 0
    .icon
        margin-right 6px  
        margin-top -2px 
</style>
