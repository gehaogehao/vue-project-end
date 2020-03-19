<template>
  <div class="header">
    <div class="header-top">
      <div class="avater">
        <img :src="sellersData.avatar" alt="头像">
      </div>
      <div class="info">
        <div class="title">
          <i class="brand"></i>
          <span class="name">{{sellersData.name}}</span>
        </div>
        <div class="msg">
          <span class="msg-info">{{sellersData.description}}/{{sellersData.deliveryTime}}分钟送达</span>
        </div>
        <div class="support" v-if="sellersData.supports">
          <ele-icon :size='1' :type='sellersData.supports[0].type'></ele-icon>
          <span class="text">{{sellersData.supports[0].content}}</span>
        </div>
        <div class="btn" @click="maskShow = true" v-if="sellersData.supports">
          <span>{{sellersData.supports.length}}个</span>
          <i class="shop-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="header-bottom" @click="maskShow = true">
      <div class="left">
        <i class="icon"></i>
        <span class="text">{{sellersData.bulletin}}</span>
      </div>
      <i class="shop-keyboard_arrow_right right"></i>
    </div>
    <div class="bg">
      <img :src="sellersData.bgImg" alt="">
    </div>
    <transition name="mask">
      <div class="mask" v-show="maskShow">
        <div class="mask-wrap">
          <div class="mask-main">
            <div class="title">{{sellersData.name}}</div>
            <div class="star">
              <ele-stars :size="36" :score="sellersData.score"></ele-stars>
            </div>
            <ele-line class="line">
              <span>优惠信息</span>
            </ele-line>
            <ele-list class="list" :supports="sellersData.supports"></ele-list>
            <ele-line class="line">
              <span>商家公告</span>
            </ele-line>
            <div class="text">
              <p>{{sellersData.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="mask-footer" @click="maskShow = false">
          <i class="shop-close close"></i>
        </div>
      </div>
    </transition>
    <i class="shop-close close" @click="$router.replace('/msite')"></i>
  </div>
</template>

<script type="text/ecmascript-6">
import icon from 'components/ele-icon/ele-icon.vue'
import line from 'components/ele-line/ele-line.vue'
import list from 'components/ele-list/ele-list.vue'
import stars from 'components/ele-stars/ele-stars.vue'
  export default {
      name:'ele-header',
      components:{
        'ele-icon':icon,
        'ele-line':line,
        'ele-list':list,
        'ele-stars':stars
      },
      props:{
        sellersData:Object
      },
      data() {
        return {
          maskShow:false
        }
      },
  }
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin.styl';
.header
  position relative
  font-size 0
  background rgba(7,17,27,.5)
  & > .close
      position fixed
      left 2px
      top 2px
      color rgb(255,255,255)
      font-size 25px
  & > .header-top
      position relative
      padding-top 24px
      padding-left 24px
      padding-bottom 18px
      .avater
        display inline-block
        vertical-align top
        width 64px
        height 64px
        border-radius 2px
        overflow hidden
        margin-right 16px
        img
          width 100%
          height 100%
      .info
        vertical-align top
        display inline-block
        color rgb(255,255,255)  
        .title
          font-size 16px 
          margin-top 2px
          margin-bottom 8px
          .brand
            bg-image(brand)
            vertical-align top
            display inline-block
            width 30px
            height 18px
            margin-right 6px
            background-size 100%
            background-repeat no-repeact
          .name 
            vertical-align top 
            font-weight 800
        .msg
          font-size 12px
          margin-bottom 10px
          line-height 12px 
          font-weight 200 
          // .msginfo
          //   line-height 12px 
          //   font-weight 200 
        .support
          font-size 10px
          margin-bottom 2px
          @media (max-width:330px) {
            width 200px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
          }
          .text
            vertical-align top  
            font-weight 200
            line-height 12px 
        .btn
          position absolute
          right 12px
          bottom 36px
          width 48px
          height 24px
          line-height 24px
          font-size 10px
          border-radius 14px
          text-align center
          background-color rgba(0,0,0,.2)
  & > .header-bottom
      position relative
      width 100%
      height 28px
      line-height 28px
      color rgb(255,255,255) 
      font-size 10px 
      font-weight 200
      background rgba(7,17,27,.2)
      .left
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        margin-right 26px
        .icon
          bg-image(bulletin)  
          display inline-block
          width 22px
          height 12px
          background-size 100%
          background-repeat no-repeat
          margin-left 12px
          margin-right 4px  
          position relative
          top 1px 
      .right
        position absolute
        right 12px
        bottom 8px
  & > .bg  
    position absolute
    let 0
    top 0
    right 0
    bottom 0
    z-index -1
    filter blur(5px)
    img
      width 100%
      height 100%
  & > .mask
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 9
    background-color rgba(7,17,27,.8) 
    backdrop-filter blur(5px);  
    padding-top 64px
    overflow-y auto
    .mask-wrap
      min-height 100%
      .mask-main
        margin-bottom 96px
        .title
          font-size 16px
          font-weight 700
          color rgb(255,255,255)
          line-height 16px
          text-align center
        .star
           text-align center
           margin-top 16px
           margin-bottom 18px
        .line
          width 80%
          margin 0 auto 
        .list
          width 80%
          margin 0 auto 28px
        .text
          font-size 12px
          font-weight 200
          color rgb(255,255,255)
          line-height 24px
          width 80%
          margin 24px auto 0
          p
            padding-left 12px
            padding-right 12px    
    .mask-footer
      margin-top -96px
      padding 32px 0
      text-align center 
      .close
        font-size 32px
        color rgba(255,255,255,.5)   
</style>
