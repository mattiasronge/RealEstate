import Vue from 'vue'
import Router from "vue-router";
import Body from '../components/body'
import Apiproductlist from '../pages/product/api_product_list.vue'
import ManualProductlist from '../pages/product/manual_product_list.vue'
import PropertyList from '../pages/property/property_list'
import PropertyDetails from '../pages/property/property_details'
import PropertyApply from '../pages/property/property_apply'
Vue.use(Router)
const routes = [
    { path: '', redirect: { name: 'APIProductList' }},
    {
        path: '/product',
        component: Body,
        children:[
          {
            path: '/product/apilist',
            name: 'APIProductList',
            component: Apiproductlist,
            meta: {
            title: 'API Product List',
            }
          },
        ]
    },  
    {
        path: '/product',
        component: Body,
        children:[
          {
            path: '/product/manual',
            name: 'ManualProductlist',
            component: ManualProductlist,
            meta: {
            title: 'Manual Product List',
            }
          },
        ]
    },  
    {
      path:'/property',
      component:Body,
      children:[
        {
          path:'/property/list',
          name:'PropertyList',
          component:PropertyList,
          meta: {
          title: 'Search from Company site',
        }
        },
        {
          path:'/property/details/:id',
          name:'PropertyDetails',
          component:PropertyDetails,
          meta: {
          title: 'PropertyDetails | From API',
        },
          props:true
        },
        {
          path:'/property/apply/:id',
          name:'PropertyApply',
          component:PropertyApply,
          meta: {
          title: 'PropertyApply, | From API',
        },
          props:true
        }
      ]
    }
];

const router = new Router({
    routes,
    base: process.env.BASE_URL,
    mode: 'history',
    linkActiveClass: "active",
    scrollBehavior () {
      return { x: 0, y: 0 }
    }
  });


export default router