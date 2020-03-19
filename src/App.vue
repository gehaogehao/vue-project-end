<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {AUTOLOGIN} from '@/store/mutation-type'
import FooterGuide from 'components/FooterGuide/FooterGuide.vue'
export default {
  name: 'App',
  components:{
    FooterGuide,
  },
  methods: {
    ...mapActions([AUTOLOGIN])
  },
  created() {
    this[AUTOLOGIN]()
  },
}
</script>

<style scoped lang="stylus">
#app
    width 100%
    height 100%
    overflow hidden
</style>
