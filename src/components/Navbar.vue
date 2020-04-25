<template>
    <div class="navbar">
        <router-link to="/" tag="li" class="navbar__link">All posts</router-link>
        <router-link to="/addPost" tag="li" class="navbar__link">Add post</router-link>
        <button v-if="isUser" class="navbar__link" @click="logOut">Выйти</button>
        <router-link v-else
                     to="/registration"
                     tag="li"
                     class="navbar__link">Registration</router-link>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'

    export default {
      name: 'Navbar',
      data() {
        return {
          isUser: false
        }
      },
      methods: {
        ...mapMutations([
          'EMPTY_USER_ONLINE'
        ]),
        logOut() {
          this.isUser = false;
          localStorage.removeItem('user');
          this.EMPTY_USER_ONLINE();
        }
      },
      mounted() {
        if (localStorage.getItem('user')) {
          this.isUser = true;
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
