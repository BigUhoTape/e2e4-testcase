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
    isLogin: false,
    isLoader: false
  },
  mutations: {
    SET_ALL_POSTS_TO_STATE(state, posts) {
      state.posts = posts;
      state.isLoader = true;
    },
    SET_ALL_USERS(state, users) {
      state.users = users;
    },
    PUSH_COMMENTS(state, comment) {
      state.comments[comment.id] = comment.comments;
    },
    SET_USER_ONLINE(state, userData) {
      state.userOnline = userData;
      state.users.push(userData);
    },
    EMPTY_USER_ONLINE(state) {
      state.userOnline = {}
    },
    IS_LOGIN(state) {
      state.isLogin = true;
    },
    IS_LOGIN_FALSE(state) {
      state.isLogin = false;
    },
    ADD_COMMENT_TO_STATE(state, data) {
      state.comments[data.postId].unshift(data);
    },
    ADD_NEW_POST(state, post) {
      state.posts.unshift(post);
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
    },
    POST_COMMENT({commit}, data) {
      return axios.post('https://jsonplaceholder.typicode.com/comments', data)
        .then(response => commit('ADD_COMMENT_TO_STATE', response.data))
        .catch(e => console.log(e));
    },
    POST_NEW_POST({commit}, postData) {
      return axios.post('https://jsonplaceholder.typicode.com/posts', postData)
        .then(response => {
          commit('ADD_NEW_POST', response.data);
          router.push('/');
        })
        .catch(e => console.log(e));
    }
  },
  getters: {
    GET_POST_BY_ID: state => id => {
      return state.posts.find(item => item.id.toString() === id.toString());
    },
    GET_USER_BY_ID: state => id => {
      return state.users.find(item => item.id === id)
    },
    COMMENT_ID: state => id => {
      return state.comments[id];
    },
    USERS_LENGTH(state) {
      return state.users.length;
    },
    LOGIN_STATUS(state) {
      return state.isLogin;
    },
    POSTS(state) {
      return state.posts;
    },
    ISLOADER(state) {
      return state.isLoader;
    }
  }
})
