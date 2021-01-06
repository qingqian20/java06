import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import login from '@/components/login'
import register from '@/components/register'
import goodssort from '@/components/goodssort'
import goodsinfo from '@/components/goodsinfo'
import cart from '@/components/cart'
import mycollection from '@/components/mycollection'
import orderinfo from '@/components/orderinfo'
import addAddress from '@/components/addAddress'
import myorder from '@/components/myorder'

Vue.use(Router)

export default new Router({
	  mode:"history",
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
		{
		  path: '/login',
		  name: 'login',
		  component: login
		},
		
		{
		  path: '/register',
		  name: 'register',
		  component: register
		},
		{
		  path: '/goodssort',
		  name: 'goodssort',
		  component: goodssort
		},
		{
		  path: '/goodsinfo',
		  name: 'goodsinfo',
		  component: goodsinfo
		},
		{
		  path: '/cart',
		  name: 'cart',
		  component: cart
		},
		{
		  path: '/mycollection',
		  name: 'mycollection',
		  component: mycollection
		},
		
		{
		  path: '/orderinfo',
		  name: 'orderinfo',
		  component: orderinfo
		},
		{
		  path: '/addAddress',
		  name: 'addAddress',
		  component: addAddress
		},
		{
		  path: '/myorder',
		  name: 'myorder',
		  component: myorder
		},
  ]
})
