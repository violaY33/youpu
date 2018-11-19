import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Details from '@/pages/Details'
import Cate from '@/pages/Cate'
import Search from '@/pages/Search'
import Cates from '@/pages/Cates'
import Collection from '@/pages/Collection'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '尤谱网'
      }
    },
    {
      path: '/details/:id',
      name: 'details',
      component: Details,
    },
    {
      path: '/cate/:cateId',
      name: 'cate',
      component: Cate
    },
    {
      path: '/cate/:cateId/:cateSubId',
      name: 'cate-sub',
      component: Cate
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/cates',
      name: 'cates',
      component: Cates
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection,
      meta: {
        title: '我的收藏'
      }
    }

  ]
})
