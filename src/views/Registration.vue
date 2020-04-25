<template>
    <div class="registration">
        <div class="registrationInput">
            <input type="email"
                   placeholder="Enter your email"
                   class="registrationInput__input"
                   v-model="email"
            >
        </div>
        <div class="registrationInput">
            <input type="text"
                   placeholder="Enter your username"
                   class="registrationInput__input"
                   v-model="userName"
            >
        </div>
        <div class="registrationInput">
            <input type="text"
                   placeholder="Enter your username"
                   class="registrationInput__input"
                   v-model="name"
            >
        </div>
        <button @click="loginUser">Sign up</button>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Registration',
    data() {
        return {
          email: '',
          userName: '',
          name: ''
        }
    },
    computed: {
      ...mapGetters([
        'USERS_LENGTH'
      ])
    },
    methods: {
      ...mapActions([
        'LOGIN_USER'
      ]),
      loginUser() {
        const userData = {
          id: this.USERS_LENGTH + 1,
          name: this.name,
          username: this.userName,
          email: this.email,
          address: {
            street: "default",
            suite: "default",
            city: "default",
            zipcode: "default",
            geo: {
              lat: "default",
              lng: "default"
            }
          },
          phone: "default",
          website: "default",
          company: {
            name: "default",
            catchPhrase: "default",
            bs: "default"
          }
        };
        this.LOGIN_USER(userData);
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
