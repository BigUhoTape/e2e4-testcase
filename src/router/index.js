import Vue from 'vue'
import VueRouter from 'vue-router'

import AllPosts from "../views/AllPosts";
import AddPost from "../views/AddPost";
import Registration from "../views/Registration";

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
      component: Registration
    },
  ];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
