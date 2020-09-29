import Vue from 'vue'
import VueRouter from 'vue-router'
import Nav from "@/components/Nav.vue"
import Section from "@/views/Section.vue"
import TieReader from "@/views/TieReader.vue"
import Login from "@/views/Login.vue"
import Index from "@/views/Index.vue"
import Footer from "@/components/Footer.vue"
import Search from "@/views/Search.vue"
import PersonCenter from "@/views/PersonCenter.vue"

Vue.use(VueRouter)

const routes = [{
  name: 'Section',
  path: '/module/:mid',
  components: {
    nav: Nav,
    main: Section,
    footer: Footer
  }
}, {
  name: 'TieReader',
  path: '/tie/:tid',
  components: {
    nav: Nav,
    main: TieReader,
    footer: Footer
  }
}, {
  name: 'login',
  path: '/login',
  components: {
    main: Login,
  }
}, {
  name: 'register',
  path: '/register',
  meta: {
    title: "注册账号"
  },
  components: {
    main: Login,
  }
}, {
  name: 'Index',
  path: '/',
  components: {
    nav: Nav,
    main: Index,
    footer: Footer
  }
}, {
  name: "Search",
  path: '/search',
  components: {
    nav: Nav,
    main: Search,
    footer: Footer
  }
}, {
  name: "PersonCenter",
  path: "/person",
  meta: {
    requiresAuth: true,
  },
  components: {
    nav: Nav,
    main: PersonCenter,
    footer: Footer,
  },
  children: [{
      path: 'avatar',
      component: () => import('@/components/PersonAvatar.vue'),
      meta: {
        requiresAuth: true,
      },
    }, {
      path: 'password',
      component: () => import("@/components/PersonPwd.vue"),
      meta: {
        requiresAuth: true,
      },
    }, {
      path: 'info',
      component: () => import("@/components/PersonInfo.vue"),
      meta: {
        requiresAuth: true,
      },
    }, {
      path: 'ties',
      component: () => import("@/components/PersonTies.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'favorite',
      component: () => import("@/components/PersonFavorite.vue"),
      meta: {
        requiresAuth: true,
      },
    }
  ]
}, {
  path: '*',
  components: {
    nav: Nav,
    footer: Footer,
  }
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
