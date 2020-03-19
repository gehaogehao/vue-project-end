// import goods from 'pages/ele-goods/ele-goods.vue'
// import ratings from 'pages/ele-ratings/ele-ratings.vue'
// import sellers from 'pages/ele-sellers/ele-sellers.vue'
// import shop from 'pages/ele-shop/shop.vue'
// import msite from 'pages/msite/msite.vue'
// import order from 'pages/order/order.vue'
// import profile from 'pages/profile/profile.vue'
// import search from 'pages/search/search.vue'
// import login from 'pages/login/login.vue'
// import user from 'pages/userMessage/userMessage.vue'

const goods = () => import(/* webpackChunkName:"goods" */ 'pages/ele-goods/ele-goods.vue')
const ratings = () => import(/* webpackChunkName:"ratings" */ 'pages/ele-ratings/ele-ratings.vue')
const sellers = () => import(/* webpackChunkName:"sellers" */ 'pages/ele-sellers/ele-sellers.vue')
const shop = () => import(/* webpackChunkName:"shop" */ 'pages/ele-shop/shop.vue')
const msite = () => import(/* webpackChunkName:"sellers" */ 'pages/msite/msite.vue')
const order = () => import(/* webpackChunkName:"sellers" */ 'pages/order/order.vue')
const profile = () => import(/* webpackChunkName:"sellers" */ 'pages/profile/profile.vue')
const search = () => import(/* webpackChunkName:"sellers" */ 'pages/search/search.vue')
const login = () => import(/* webpackChunkName:"sellers" */ 'pages/login/login.vue')
const user = () => import(/* webpackChunkName:"sellers" */ 'pages/userMessage/userMessage.vue')

import store from '@/store'

export default [
    {
        path:'/shop/:id',
        component:shop,
        props:true,
        children:[
            {path:'goods',component:goods},
            {path:'ratings',component:ratings},
            {path:'sellers',component:sellers},
            {path:'',redirect:'goods'}
        ]
    },

    { path: '/msite', component: msite, meta: { showFooter: true } },
    { path: '/order', component: order, meta: { showFooter: true } },
    { path: '/profile', component: profile, meta: { showFooter: true } },
    { path: '/search', component: search, meta: { showFooter: true } },
    { 
        path: '/login', 
        component: login,
        meta: { showFooter: false },
        beforeEnter: (to, from, next) => {
            if(store.state.user._id){
                next('/msite')
            }else{
                next()
            }
        }
    },
    { path: '/userMessage', component: user, meta: { showFooter: false } },
    { path: '/', redirect: '/msite' }
]