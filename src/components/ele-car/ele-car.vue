<template>
  <div>
      <div class="car">
        <div class="left" @click="flodFn">
            <div class="icon">
                <div class="logo" :class="{active:totalCount >0}">
                    <i class="shop-shopping_cart"></i>
                </div>
                <span class="qipao" v-show="totalCount >0">{{totalCount}}</span>
            </div>
            <div class="totalPrice">
                <span>￥{{totalPrice}}</span>
            </div>
            <div class="deliveryPrice">
                <span>另需配送费¥{{sellersData.deliveryPrice}}元</span>
            </div>
        </div>
        <div class="right" :class="{active:totalPrice>=sellersData.minPrice}">
            <span v-if="rightText">{{rightText}}</span>
        </div>
        <div class="balls">
            <transition v-for="(item, index) in balls" :key="index"
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
            >
                <i class="ball" v-show="item.show"></i>
            </transition>
        </div>
    </div>
    <div class="list" v-show="showList">
        <div class="header">
            <span class="cartText">购物车</span>
            <span class="clear" @click='clear'>清除</span>
        </div>
        <div class="content" ref="content">
            <ul>
                <li class="item" v-for="(food, index) in foods" :key="index">
                    <span class="left">{{food.name}}</span>
                    <div class="right">
                        <span class="price">￥{{food.price * food.count}}</span>
                        <ele-contorl class="contorl" :food="food"></ele-contorl>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="mask" v-show="showList" @click="flod=true"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import {transform} from "@/util/transform.js"
import contorl from "components/ele-contorl/ele-contorl.vue"
import BScroll from 'better-scroll'
  export default {
      name:'ele-car',
      props:{
          sellersData:Object,
          foods:Array
      },
      data() {
          return {
              balls:[
                  {show:false},
                  {show:false},
                  {show:false},
                  {show:false},
                  {show:false},
                  ],
              dropBalls:[],
              flod:true    
          }
      },
      computed: {
          totalCount(){
              let totalCount = 0
              this.foods.forEach((food)=>{
                  totalCount += food.count
              })
              return totalCount
          },
          totalPrice(){
              let totalPrice = 0
              this.foods.forEach((food)=>{
                  totalPrice += food.price * food.count
              })
              return totalPrice
          },
          rightText(){
              if(this.totalPrice === 0){
                  return `￥${this.sellersData.minPrice}起送`
              } 
              else if(this.totalPrice < this.sellersData.minPrice){
                  return `还差¥${this.sellersData.minPrice - this.totalPrice}起送`
              }else{
                  return `去结算`
              }
          },
          showList(){
              if(this.totalCount <= 0){
                  this.flod = true
                  return false
              }
             
             this.$nextTick(()=>{
                 if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.content,{click:true})
                 }else{
                    this.scroll.refresh()
                 }
             })
              return !this.flod
          }
      },
      methods: {
          dropBall(target){
              for(let i = 0; i < this.balls.length; i++) {
                  let ball = this.balls[i]
                  if(!ball.show){
                      ball.show = true
                      ball.target = target
                      this.dropBalls.push(ball)
                      return
                  }
              }
          },
          beforeEnter(el){
              let count = this.balls.length
              while(count--){
                  let ball = this.balls[count]
                  if(ball.show){

                      let viewH = document.documentElement.clientHeight
                      let targetRect = ball.target.getBoundingClientRect() 
                      let X = targetRect.left - 28
                      let Y = viewH - targetRect.top - 45

                      transform(el,"translateX",X)
                      transform(el,"translateY",-Y)
                      break
                  }
              }
  
          },
          enter(el){
                let hook = el.offsetHeight;
                this.$nextTick(()=>{
                    transform(el,"translateX",0)
                    transform(el,"translateY",0)
                })
          },
          afterEnter(el){
              const ball = this.dropBalls.shift()
              if(ball.show){
                  ball.show = false
                  el.style.display = 'none'
              }
          },
          clear(){
              this.$emit("clear")
          },
          flodFn(){
            if(this.totalCount <= 0){
                return ;
            }
            this.flod = !this.flod
          }
      },
      mounted() {
          this.bus.$on("ballsAnimation",(target)=>{
              this.dropBall(target)
          })
      },
      components:{
          'ele-contorl':contorl
      }
  }
  
</script>

<style scoped lang='stylus'>
@import "../../common/stylus/mixin.styl"
.car
    flex 0 0 0 
    position fixed
    left 0
    bottom 0
    z-index 3
    display flex
    width 100%
    height 46px
    background-color #141d27
    .left
        flex 1
        height 100%
        display flex
        .icon
            position relative
            bottom 15px
            width 56px
            height 56px
            border-radius 50%
            background #141d27
            margin-left 12px
            margin-right 12px
            display flex
            justify-content center
            align-items center
            z-index 3
            .logo
                display flex
                justify-content center
                align-items center
                width 44px
                height 44px
                border-radius 50%
                background rgba(255,255,255,0.4)
                &.active
                    background rgba(0,160,220,1)
                    i
                        color white
                i
                    color rgba(255,255,255,0.4)
            .qipao
                position absolute
                right 0
                top 5px
                width 24px
                height 16px
                line-height 16px
                border-radius 6px
                background red
                font-size 9px
                font-weight 700
                text-align center 
        .totalPrice
            display flex
            justify-content center
            align-items center
            margin-right 12px
            font-size 16px
            line-height 24px
            font-weight 700
            color rgba(255,255,255,.4)
            &.active
                color white
        .deliveryPrice
            display flex
            justify-content center
            align-items center
            font-size 14px
            line-height 24px
            font-weight 700
            color rgba(255,255,255,.4)
            padding-left 12px
            border-left 2px solid rgba(255,255,255,0.1)               
    .right
        flex 0 0 105px
        display flex
        justify-content center
        align-items center
        height 100%
        background-color rgba(255,255,255,.2)
        &.active
            background green
            span
                color white
        span
            color rgba(255,255,255,0.6)
    .balls
        .ball
            position absolute
            left 31px
            top 5px
            width 16px
            height 16px
            border-radius 50%
            background deeppink
            transition .3s transform linear 
.list
    max-height 255px
    position fixed
    left 0
    bottom 45px
    width 100%
    z-index 2
    background-color #f3f5f7                   
    padding-bottom 20px 
    .header
        one-px(rgba(7,17,27,.1))
        height 40px
        background #f3f5f7
        display flex
        justify-content space-between
        align-items center 
        .cartText
            margin-left 18px ;
            color rgba(7,17,27,1);
            font-weight 800
            font-size 14px 
        .clear
            margin-right 18px
            color rgba(0,160,220,1);
            font-weight 800
            font-size 14px 
    .content
        height 195px
        overflow hidden
        .item
            one-px(rgba(7,17,27,.1))
            display flex
            height 48px
            align-items center
            justify-content space-between 
            .left
                padding-left 18px
            .right
                display flex
                align-items center
                padding-right 22px
                .price
                    margin-right 12px
                    color rgba(240,20,20,1)
                    font-size 10px
                    font-weight 700 
                .contorl
                    display flex
                    align-items center
.mask
    position fixed
    z-index 1
    left 0
    right 0
    top 0
    bottom 0
    background rgba(7,17,27,.6)
    backdrop-filter blur(5px)                                          
</style>
