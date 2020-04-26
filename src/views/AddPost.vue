<template>
    <div class="addPost">
        <div class="addPostInput">
            <input type="text"
                   class="addPostInput__input"
                   placeholder="Enter post's title"
                   v-model="title"
                   :class="{'isInvalid': $v.title.$error}"
                   @input="$v.title.$touch()"
            >
            <div v-if="isTitleValid">
                <div v-if="!$v.title.required" class="addPostInput__error">title is required</div>
                <div class="addPostInput__error" v-if="!$v.title.minLength">
                    Min length of title is {{$v.title.$params.minLength.min}}. Now it's {{ title.length }}
                </div>
            </div>
        </div>
        <div class="addPostInput">
            <textarea cols="30" rows="10"
                      class="addPostInput__input"
                      placeholder="Enter post's body"
                      v-model="body"
                      :class="{'isInvalid': $v.body.$error}"
                      @input="$v.body.$touch()"
            ></textarea>
            <div v-if="isBodyValid">
                <div v-if="!$v.body.required" class="addPostInput__error">body is required</div>
                <div class="addPostInput__error" v-if="!$v.body.minLength">
                    Min length of body is {{$v.body.$params.minLength.min}}. Now it's {{ body.length }}
                </div>
            </div>
        </div>
        <button class="addPost__btn"
                :disabled="$v.$invalid"
                :class="{'disabled': $v.$invalid}"
                @click="addPost">Add post</button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { required, minLength } from 'vuelidate/lib/validators'

  export default {
    name: 'AddPost',
    validations: {
      title: {
        required,
        minLength: minLength(5)
      },
      body: {
        required,
        minLength: minLength(10)
      }
    },
    watch: {
      title() {
        this.isTitleValid = true;
      },
      body() {
        this.isBodyValid = true;
      }
    },
    data() {
      return {
        title: '',
        body: '',
        isTitleValid: false,
        isBodyValid: false
      }
    },
    methods: {
      ...mapActions([
        'POST_NEW_POST'
      ]),
      addPost() {
        const post = {
          userId: this.$store.state.userOnline.id,
          title: this.title,
          body: this.body
        };
        this.POST_NEW_POST(post);
      }
    }
  }
</script>

<style lang="less" scoped>
    .addPost {
        display: flex;
        flex-direction: column;
        align-items: center;

        &__btn {
            width: 400px;
            height: 40px;
            font-size: 20px;
            transition: .3s;

            &:hover {
                background-color: black;
                color: white;
                transition: .3s;
            }
        }
    }

    .addPostInput {
        margin-bottom: 30px;
        &__input {
            width: 400px;
            height: 40px;
            outline: none;
            font-size: 20px;
            padding-left: 10px;
            border: 2px solid gray;
            border-radius: 6px;

            &:focus {
                border: 2px solid black;
            }
        }

        &__error {
            color: red;
            padding-left: 10px;
            margin-top: 10px;
        }
    }
    .isInvalid {
        border: 2px solid red !important;
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
