<template>
  <div class="goods">
    <div class="left" ref="typeWrap">
      <ul class="typeList" ref="typeList">
        <li v-for="(item, index) in goods" :key="index" class="typeItem"
        :class="{active:currentIndex===index}"
        @click="handleCForTypeItem(index)">
          <ele-icon :size='3' :type='item.type' v-show="item.type >= 0"></ele-icon>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="right" ref="foodsWrap">
      <ul class="foodsList" ref="foodsList">
        <li class="foodsItem" v-for="(good, index) in goods" :key="index">
          <h2 class="title">{{good.name}}</h2>
          <ul class="foodList">
            <li class="foodItem" v-for="(food, index) in good.foods" :key="index" >
              <ele-food :food='food'></ele-food>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ele-car :sellersData="sellersData" :foods="foods" @clear='clear'></ele-car>
  </div>
</template>

<script type="text/ecmascript-6">
import icon from "components/ele-icon/ele-icon.vue"
import food from "components/ele-food/ele-food.vue"
import car from "components/ele-car/ele-car.vue"
import BScroll from 'better-scroll'
import {mapState,mapActions} from 'vuex'
import {GETGOODS} from '@/store/mutation-type.js'
const OK = "ok"
  export default {
      name:'ele-goods',
      props:{
        sellersData:Object
      },
      data() {
        return {
          tops:[],
          scrollY:0,
        }
      },
      components:{
        'ele-icon':icon,
        'ele-food':food,
        'ele-car':car
      },
      methods: {
        ...mapActions([GETGOODS]),
        handleCForTypeItem(index){
          const top = this.tops[index]
          this.foodsScroll.scrollTo(0,-top,300)
        },
        _initScroll(){
          this.typeScroll = new BScroll(this.$refs.typeWrap,{
            click:true
          })
          this.foodsScroll = new BScroll(this.$refs.foodsWrap,{
            click:true,
            probeType:3
          })
          this.foodsScroll.on("scroll",({x,y})=>{
            this.scrollY = Math.abs(y)
          })
        },
        _initTops(){
          let foodsItems = this.$refs.foodsList.children;
          let top = 0
          let tops = [top]
          Array.from(foodsItems).forEach((foodsItem)=>{
            top += foodsItem.offsetHeight;
            tops.push(top)
          })
          this.tops = tops
        },
        clear(){
          this.foods.forEach((food)=>{
            food.count = 0
          })
        }
      },
      computed: {
        ...mapState(["goods"]),
        foods(){
          let foods = []
          this.goods.forEach((good)=>{
            good.foods.forEach((food)=>{
              if(food.count > 0) foods.push(food)
            })
          })
          return foods
        },
        currentIndex(){
          let {tops,scrollY} = this;
          let index = tops.findIndex((top,index)=>{
              return scrollY >= top && scrollY < tops[index+1]
          })

          if(this.oldIndex !== index){
             this.oldIndex = index;
             let targetLi = this.$refs.typeList && this.$refs.typeList.children[index]
             this.typeScroll && this.typeScroll.scrollToElement(targetLi,300)
          }
          return index
        }
      },
      async mounted() {
        await this[GETGOODS]()
        
        this.$nextTick(()=>{
          this._initScroll()  
          this._initTops()
        })

        this.bus.$on('addCount',(food)=>{
          if(food.count) food.count++
          else this.$set(food,'count',1)
        })
        this.bus.$on('removeCount',(food)=>{
          if(food.count > 0) food.count--
        })
      },
  }
</script>

<style scoped lang="stylus">
@import "../../common/stylus/mixin.styl";
.goods
  display flex 
  position absolute
  top 174px
  left 0
  right 0
  bottom 46px
  overflow hidden
  .left
    flex 0 0 80px
    .typeList
      font-size 12px
      color rgb(240,20,20)
      background-color #f3f5f7
      font-weight 200
      .typeItem
        width 100%
        height 54px
        line-height 14px
        display flex
        justify-content center
        align-items center
        one-px(rgba(7,17,27,.1))
        &.active
          background-color pink
        &:after
          left 0
          right 0
          margin auto
          width 56px
  .right
    flex 1  
    .foodsList
      .foodsItem
        .title
          height 26px
          background-color #f3f5f7
          border-left 3px solid #d9dde1
          font-size 12px
          line-height 26px
          color rgba(143,153,159,1)
        .foodList
          .foodItem
            padding 18px
            one-px(rgba(7,17,27,.1)) 
            &:last-child
              .food
                  border-none()   
</style>
