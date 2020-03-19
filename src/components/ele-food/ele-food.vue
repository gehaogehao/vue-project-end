<template>
  <div class="food">
     <div class="left">
         <img :src="food.icon">
     </div>
     <div class="right">
         <span class="name">{{food.name}}</span>
         <span class="description">{{food.description}}</span>
         <span class="msg">
             <span>月售{{food.sellCount}}份</span>
             <span class="rating">好评率{{food.rating}}%</span>
         </span>
         <span class="price">
             <span class="newPrice">￥{{food.price}}</span>
             <span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
         </span>
     </div>
     <ele-contorl :food='food' class="contorl"></ele-contorl>
  </div>
</template>

<script type="text/ecmascript-6">
import contorl from "components/ele-contorl/ele-contorl.vue"
  export default {
      name:'ele-food',
      props:{
          food:Object
      },
      components:{
          'ele-contorl':contorl
      }
  }
</script>

<style scoped lang="stylus">
.food
    display flex
    position relative
    .left
        flex 0 0 60px
        height 60px
        margin-right 10px
        img 
           width 100%
           height 100%
    .right
        flex 1  
        display flex
        flex-direction column  
        .name
            font-size 14px
            color rgb(7,17,27) 
            line-height 14px
            margin-top 2px
            margin-bottom 8px
        .description
            font-size 10px
            color rgb(147,153,159) 
            line-height 10px  
            margin-bottom 8px 
        .msg
            font-size 10px
            color rgb(147,153,159) 
            line-height 10px 
            margin-bottom 8px
            .rating
                margin-left 12px
        .price
            .newPrice
                color red
                font-size 14px
                margin-right 8px
                font-weight 800
                line-height 24px 
                 
            .oldPrice  
                font-size 10px 
                font-weight 800
                color rgb(147,153,159)
                line-height 24px
                text-decoration line-through 
    .contorl 
        position absolute
        right 0
        bottom 3px           
</style>
