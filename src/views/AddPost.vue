<template>
    <div class="addPost">
        <div class="addPostInput">
            <input type="text"
                   class="addPostInput__input"
                   placeholder="Enter post's title"
                   v-model="title"
            >
        </div>
        <div class="addPostInput">
            <textarea cols="30" rows="10"
                      class="addPostInput__input"
                      placeholder="Enter post's body"
                      v-model="body"
            ></textarea>
        </div>
        <button class="addPost__btn" @click="addPost">Add post</button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

  export default {
    name: 'AddPost',
    data() {
      return {
        title: '',
        body: ''
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
        &__input {
            width: 400px;
            height: 40px;
            margin-bottom: 30px;
            outline: none;
            font-size: 20px;
            padding-left: 10px;
            border: 2px solid gray;
            border-radius: 6px;

            &:focus {
                border: 2px solid black;
            }
        }
    }
</style>
