<template>
    <div class="commentForm">
        <input type="text"
               v-model="commentName"
               placeholder="Enter post's name"
               class="commentForm__postName"
        >
        <textarea cols="30"
                  rows="10"
                  v-model="commentBody"
                  placeholder="Enter your comment"
                  class="commentForm__body"
        ></textarea>
        <button class="commentForm__btn"
                @click="addComment"
        >Add comment</button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
      name: 'CommentForm',
      data() {
        return {
          commentName: '',
          commentBody: ''
        }
      },
      methods: {
        ...mapActions([
          'POST_COMMENT'
        ]),
        addComment() {
          const comment = {
            postId: this.$route.params.id,
            name: this.commentName,
            email: this.$store.state.userOnline.email,
            body: this.commentBody
          };
          this.POST_COMMENT(comment)
            .then(() => {
            this.commentBody = '';
            this.commentName = ''
          })
        }
      }
    }
</script>

<style lang="less" scoped>
    .commentForm {
        display: flex;
        flex-direction: column;
        width: 400px;

        &__postName {
            height: 40px;
            border: none;
            border-bottom: 2px solid gray;
            margin-bottom: 30px;
            outline: none;
            font-size: 20px;
            padding-left: 10px;

            &:focus {
                border-bottom: 2px solid black;
            }
        }

        &__body {
            height: 40px;
            border: 1px solid gray;
            border-radius: 5px;
            margin-bottom: 30px;
            font-size: 20px;
            outline: none;

            &:focus {
                border: 2px solid black;
            }
        }

        &__btn {
            height: 40px;
            border-radius: 5px;
            font-size: 18px;
            transition: .3s;

            &:hover {
                background-color: black;
                color: white;
                transition: .3s;
            }
        }
    }
</style>
