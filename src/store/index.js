import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    SET_ALL_POSTS_TO_STATE(state, posts) {
      state.posts = posts;
    }
  },
  actions: {
    GET_ALL_POSTS({commit}) {
      return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => commit('SET_ALL_POSTS_TO_STATE', json))
        .catch(e => console.log(e));
    }
  },
  getters: {
    GET_POST_BY_ID: state => id => {
      console.log(state.posts[id-1].title);
    }
  }
})
