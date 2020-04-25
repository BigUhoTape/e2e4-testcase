<template>
    <div class="singlePost">
        <button @click="$router.go(-1)" class="singlePost__back">Back</button>
        <div class="singlePost-post">
            <h3 class="singlePost-post__title"><strong>{{post.id}} </strong>{{post.title}}</h3>
            <p class="singlePost-post__body">{{post.body}}</p>
            <p class="singlePost-post__user">{{userPost.name}}  <span>{{userPost.email}}</span> </p>
        </div>
        <router-link to="/registration"
                     v-if="!LOGIN_STATUS"
                     class="singlePost__register"
        >Register to start commenting</router-link>
        <div class="singlePost__comment" v-for="(comment, i) in comments" :key="i">
            <Comment :commentData="comment"/>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import Comment from './../components/Comment'

    export default {
      name: 'SinglePost',
      components: {
        Comment
      },
      data() {
        return {
          id: this.$route.params.id,
          post: {},
          userPost: {},
          comments: []
        }
      },
      computed: {
        ...mapGetters([
          'GET_POST_BY_ID',
          'GET_USER_BY_ID',
          'COMMENT_ID',
          'LOGIN_STATUS'
        ])
      },
      methods: {
        ...mapActions([
          'GET_ALL_POSTS',
          'GET_ALL_USERS',
          'GET_COMMENT_BY_ID'
        ])
      },
      mounted() {
        this.GET_ALL_POSTS()
            .then(() => this.post = this.GET_POST_BY_ID(this.id))
            .then(() => this.GET_ALL_USERS())
            .then(() => this.userPost = this.GET_USER_BY_ID(this.post.userId))
            .then(() => this.GET_COMMENT_BY_ID(this.id))
            .then(() => this.comments = this.COMMENT_ID(this.id))
      }
    }
</script>

<style lang="less" scoped>
    .singlePost {
        width: 1000px;
        margin: 0 auto;

        &__register {
            margin-top: 100px;
            padding: 20px;
            background-color: #d26959;
            text-decoration: none;
            color: white;
            font-size: 20px;
            border-radius: 6px;
            transition: .3s;

            &:hover {
                background-color:red;
                transition: .3s;
            }
        }

        &__back {
            width: 100px;
            height: 50px;
            font-size: 20px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            transition: .3s;
            margin-bottom: 100px;

            &:hover {
                background-color: #000;
                color: #fff;
                transition: .3s;
            }
        }

        &-post {
            display: flex;
            flex-direction: column;
            padding: 20px;
            width: 1000px;
            margin: 0 auto;
            border: 1px solid rgba(0, 0, 0, .3);
            margin-bottom: 40px;

            &__title {
                font-size: 30px;

                strong {
                    font-size: 35px;
                }
            }

            &__body {
                font-size: 20px;
            }

            &__user {
                display: flex;
                justify-content: flex-end;
                font-size: 20px;
                font-weight: bold;

                span {
                    font-weight: normal;
                    color: gray;
                }
            }
        }
    }
</style>
