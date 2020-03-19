<template>
  <div id="app">
    <ele-header :sellersData="sellersData"></ele-header>
    <div class="navs">
      <div class="item">
        <router-link :to="`/shop/${id}/goods`">商品</router-link>
      </div>
      <div class="item">
        <router-link :to="`/shop/${id}/ratings`">评价</router-link>
      </div>
      <div class="item">
        <router-link :to="`/shop/${id}/sellers`">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :sellersData='sellersData'></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from "components/ele-header/ele-header.vue";
import {mapState,mapActions} from 'vuex'
import {GETSELLERS} from '@/store/mutation-type.js'
const OK = 0;
export default {
  name: "App",
  props:{
    id:String
  },
  computed: {
    ...mapState(["sellersData"])
  },
  methods: {
    ...mapActions([GETSELLERS])
  },
  components: {
    "ele-header": Header
  },
  mounted() {
    this[GETSELLERS](this.id)
  },
  //组件复用时候 通过id获取最新商家信息
  beforeRouteUpdate (to, from, next) {
      this[GETSELLER](to.params.id);
      next()
  }
}
</script>

<style scoped lang='stylus'>
@import '../../common/stylus/mixin.styl';
#app
  position relative
  width 100%
  height 100% 
  .navs
    one-px(rgba(7,17,27,.1))
    display flex
    height 40px
    line-height 40px
    .item
      flex 1
      text-align center
      a
        width 100%
        height 100%
        display block
        font-size 14px
        color rgb(77,85,93)
        &.active
             color rgb(240,20,20)
</style>
