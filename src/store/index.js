import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import router from '../router/index'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    users: [],
    comments: {},
    userOnline: {},
    isLogin: false
  },
  mutations: {
    SET_ALL_POSTS_TO_STATE(state, posts) {
      state.posts = posts;
    },
    SET_ALL_USERS(state, users) {
      state.users = users;
    },
    PUSH_COMMENTS(state, comment) {
      state.comments[comment.id] = comment.comments;
    },
    SET_USER_ONLINE(state, userData) {
      state.userOnline = userData;
    },
    EMPTY_USER_ONLINE(state) {
      state.userOnline = {}
    },
    IS_LOGIN(state) {
      state.isLogin = true;
    },
    IS_LOGIN_FALSE(state) {
      state.isLogin = false;
    }
  },
  actions: {
    GET_ALL_POSTS({commit}) {
      return axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(posts => commit('SET_ALL_POSTS_TO_STATE', posts.data))
        .catch(e => console.log(e));
    },
    GET_ALL_USERS({commit}) {
      return axios.get('https://jsonplaceholder.typicode.com/users')
        .then(users => commit('SET_ALL_USERS', users.data))
        .catch(e => console.log(e));
    },
    GET_COMMENT_BY_ID({commit}, userID) {
      return axios.get('https://jsonplaceholder.typicode.com/posts/' + userID + '/comments')
        .then(comments => commit('PUSH_COMMENTS', {id: userID, comments: comments.data}))
        .catch(e => console.log(e));
    },
    LOGIN_USER({commit}, userData) {
      return fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => response.json())
        .then(user => {
          localStorage.setItem('user', JSON.stringify(user));
          commit('IS_LOGIN');
          commit('SET_USER_ONLINE', user);
          router.go(-1);
        })
    }
  },
  getters: {
    GET_POST_BY_ID: state => id => {
      return state.posts.find(item => item.id.toString() === id.toString());
    },
    GET_USER_BY_ID: state => id => {
      return state.users.find(item => item.id.toString() === id.toString());
    },
    COMMENT_ID: state => id => {
      return state.comments[id];
    },
    USERS_LENGTH(state) {
      return state.users.length;
    },
    LOGIN_STATUS(state) {
      return state.isLogin;
    }
  }
})
