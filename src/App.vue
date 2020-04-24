<template>
  <div id="app">
      <Navbar />
      <router-view/>
  </div>
</template>

<script>
    import Navbar from "./components/Navbar";
    import {mapActions} from 'vuex'

    export default {
      components: {
        Navbar
      },
      methods: {
        ...mapActions([
          'GET_ALL_POSTS'
        ])
      },
      mounted() {
        this.GET_ALL_POSTS();
      }
    }
</script>

<style lang="less">
    .navbar {
        width: 1000px;
        height: 100px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style: none;

        &__link {
            color: gray;
            font-size: 30px;
            transition: .3s;

            &:hover {
                color: black;
                transition: .3s;
                cursor: pointer;
            }
        }
    }
</style>
