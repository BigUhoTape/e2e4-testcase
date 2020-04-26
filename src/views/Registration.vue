<template>
    <div class="registration">
        <div class="registrationInput">
            <input type="email"
                   placeholder="Enter your email"
                   class="registrationInput__input"
                   v-model="email"
                   :class="{'isInvalid': $v.email.$error}"
                   @input="$v.email.$touch()"
            >
            <div v-if="isEmailValid">
                <div class="registrationInput__error" v-if="!$v.email.required">Email is required</div>
                <div class="registrationInput__error" v-if="!$v.email.email">Email is invalid</div>
            </div>
        </div>
        <div class="registrationInput">
            <input type="text"
                   placeholder="Enter your username"
                   class="registrationInput__input"
                   v-model="userName"
                   :class="{'isInvalid': $v.userName.$error}"
                   @input="$v.userName.$touch()"
            >
            <div v-if="isUserNameValid">
                <div v-if="!$v.userName.required" class="registrationInput__error">username is required</div>
                <div class="registrationInput__error" v-if="!$v.userName.minLength">
                    Min length of username is {{$v.userName.$params.minLength.min}}. Now it's {{ userName.length }}
                </div>
                <div class="registrationInput__error" v-if="!$v.userName.alpha">Name must contain a-z а-яё 0-9</div>
            </div>
        </div>
        <div class="registrationInput">
            <input type="text"
                   placeholder="Enter your name"
                   class="registrationInput__input"
                   v-model="name"
                   :class="{'isInvalid': $v.name.$error}"
                   @input="$v.name.$touch()"
            >
            <div v-if="isNameValid">
                <div class="registrationInput__error" v-if="!$v.name.required">Name is required</div>
                <div class="registrationInput__error" v-if="!$v.name.alpha">Name must contain a-z а-яё</div>
            </div>
        </div>
        <button @click="loginUser"
                :disabled="$v.$invalid"
                :class="{'disabled': $v.$invalid}"
                class="registration__btn"
        >Sign up</button>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { required, email, minLength } from 'vuelidate/lib/validators'

  export default {
    name: 'Registration',
    validations: {
      email: {
        required,
        email,
      },
      userName: {
        required,
        minLength: minLength(6),
        alpha: val => /^[a-zа-яё0-9]*$/i.test(val),
      },
      name: {
        required,
        alpha: val => /^[a-zа-яё]*$/i.test(val),
      }
    },
    watch: {
      email() {
        this.isEmailValid = true;
      },
      userName() {
        this.isUserNameValid = true;
      },
      name() {
        this.isNameValid = true;
      }
    },
    data() {
        return {
          email: '',
          userName: '',
          name: '',
          isEmailValid: false,
          isUserNameValid: false,
          isNameValid: false
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

        &__error {
            padding-left: 10px;
            margin-top: 10px;
            color: red;
        }
    }
    .isInvalid {
        border-bottom: 2px solid red !important;
    }
    .disabled {
        background-color: #b2b2b2;
        color: #D2D2D2;

        &:hover {
            background-color: #b2b2b2;
            color: #D2D2D2;
            cursor: not-allowed;
        }
    }
</style>
