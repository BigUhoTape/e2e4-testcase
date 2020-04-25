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
        <button @click="loginUser" class="registration__btn">Sign up</button>
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
    .registration {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;

        &__btn {
            width: 400px;
            height: 40px;
            border-radius: 5px;
            font-size: 20px;
            transition: .3s;

            &:hover {
                cursor: pointer;
                transition: .3s;
                color: white;
                background-color: black;
            }
        }
    }
    .registrationInput {
        margin-bottom: 50px;

        &__input {
            width: 400px;
            height: 40px;
            border: none;
            border-bottom: 2px solid gray;
            outline: none;
            font-size: 20px;
            padding-left: 10px;

            &:focus {
                border-bottom: 2px solid black;
            }
        }
    }
</style>
