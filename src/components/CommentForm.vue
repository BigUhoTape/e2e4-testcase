<template>
    <div class="commentForm">
        <div class="commentFormInput">
            <input type="text"
                   v-model="commentName"
                   placeholder="Enter comment name"
                   class="commentForm__postName"
                   :class="{'isInvalid': $v.commentName.$error}"
                   @input="$v.commentName.$touch()"
            >
            <div v-if="isCommentNameValid">
                <div v-if="!$v.commentName.required" class="commentFormInput__error">title is required</div>
            </div>
        </div>
        <div class="commentFormInput">
            <textarea cols="30"
                      rows="10"
                      v-model="commentBody"
                      placeholder="Enter your comment"
                      class="commentForm__body"
                      :class="{'isInvalid': $v.commentBody.$error}"
                      @input="$v.commentBody.$touch()"
            ></textarea>
            <div v-if="isCommentBodyValid">
                <div v-if="!$v.commentBody.required" class="commentFormInput__error">comment is required</div>
            </div>
        </div>
        <button class="commentForm__btn"
                @click="addComment"
                :disabled="$v.$invalid"
                :class="{'disabled': $v.$invalid}"
        >Add comment</button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { required } from 'vuelidate/lib/validators'

    export default {
      name: 'CommentForm',
      validations: {
        commentName: {
          required
        },
        commentBody: {
          required
        }
      },
      watch: {
        commentName() {
          this.isCommentNameValid = true
        },
        commentBody() {
          this.isCommentBodyValid = true
        }
      },
      data() {
        return {
          commentName: '',
          commentBody: '',
          isCommentNameValid: false,
          isCommentBodyValid: false
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

        &__body {
            width: 400px;
            height: 40px;
            border: 1px solid gray;
            border-radius: 5px;
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
    .commentFormInput {
        margin-bottom: 30px;

        &__error {
            color: red;
            padding-left: 10px;
            margin-top: 10px;
        }
    }
    .isInvalid {
        border: 2px solid red !important;
        border-radius: 6px;
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
