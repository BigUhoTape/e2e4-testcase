<template>
    <div class="navbar">
        <router-link to="/" tag="li" class="navbar__link">All posts</router-link>
        <router-link to="/addPost" tag="li" class="navbar__link">Add post</router-link>
        <button v-if="LOGIN_STATUS" class="navbar__link" @click="logOut">Выйти</button>
        <router-link v-else
                     to="/registration"
                     tag="li"
                     class="navbar__link">Registration</router-link>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'

    export default {
      name: 'Navbar',
      data() {
        return {}
      },
      methods: {
        ...mapMutations([
          'EMPTY_USER_ONLINE',
          'IS_LOGIN',
          'IS_LOGIN_FALSE'
        ]),
        logOut() {
          this.IS_LOGIN_FALSE();
          localStorage.removeItem('user');
          this.EMPTY_USER_ONLINE();
        }
      },
      computed: {
        ...mapGetters([
          'LOGIN_STATUS'
        ])
      },
      mounted() {
        if (localStorage.getItem('user')) {
            this.IS_LOGIN();
        }
      }
    }
</script>

<style lang="less" scoped>
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
