import Vue from 'vue'
import VueRouter from 'vue-router'

import AllPosts from "../views/AllPosts";
import AddPost from "../views/AddPost";
import Registration from "../views/Registration";
import SinglePost from "../views/SinglePost";

Vue.use(VueRouter);

  const routes = [
    {
      path: '/',
      name: 'Allposts',
      component: AllPosts
    },
    {
      path: '/addPost',
      name: 'AddPost',
      component: AddPost
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/post/:id',
      name: 'SinglePost',
      component: SinglePost
    }
  ];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('user')) {
      next();
      return
    }
    next('/');
  } else {
    next();
  }
});

export default router
