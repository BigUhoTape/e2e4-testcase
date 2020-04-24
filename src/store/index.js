import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    users: []
  },
  mutations: {
    SET_ALL_POSTS_TO_STATE(state, posts) {
      state.posts = posts;
    },
    SET_ALL_USERS(state, users) {
      state.users = users;
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
    }
  },
  getters: {
    GET_POST_BY_ID: state => id => {
      return state.posts.find(item => item.id.toString() === id.toString());
    },
    GET_USER_BY_ID: state => id => {
      return state.users.find(item => item.id.toString() === id.toString());
    }
  }
})
