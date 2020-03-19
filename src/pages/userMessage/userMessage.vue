<template>
  <div>
      <van-button type="primary" @click="clearUser">退出登录</van-button>
  </div>
</template>

<script type="text/ecmascript-6">
import {Button} from 'vant'
import {mapActions} from 'vuex'
import {CLEARUSER} from '@/store/mutation-type.js'
import router from '@/router'
  export default {
      name:'UserMessage',
      components:{
        [Button.name]:Button
      },
      methods: {
        ...mapActions([CLEARUSER]),
        clearUser(){
          this[CLEARUSER]()
          localStorage.removeItem('ele-token')
          router.replace('/login')
        }
      },
  }
</script>

<style scoped lang='stylus'>

 
</style>
