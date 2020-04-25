<template>
  <div id="app">
      <Navbar />
      <router-view/>
  </div>
</template>

<script>
    import Navbar from "./components/Navbar";
    import {mapActions, mapMutations} from 'vuex'

    export default {
      components: {
        Navbar
      },
      methods: {
        ...mapActions([
          'GET_ALL_POSTS',
          'GET_ALL_USERS'
        ]),
        ...mapMutations([
          'SET_USER_ONLINE'
        ])
      },
      mounted() {
        this.GET_ALL_POSTS();
        this.GET_ALL_USERS();
        if (localStorage.getItem('user')) {
            this.SET_USER_ONLINE(JSON.parse(localStorage.getItem('user')));
        }
      }
    }
</script>

<style lang="less">
</style>
