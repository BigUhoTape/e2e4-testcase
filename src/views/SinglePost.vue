<template>
    <div class="singlePost">
        <button @click="$router.push('/')" class="singlePost__back">Back</button>
        <div class="singlePost-post">
            <p><strong>{{post.id}})</strong>{{post.title}}</p>
            {{userPost.email}}
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
      name: 'SinglePost',
      data() {
        return {
          id: this.$route.params.id,
          post: {},
          userPost: {}
        }
      },
      computed: {
        ...mapGetters([
          'GET_POST_BY_ID',
          'GET_USER_BY_ID'
        ])
      },
      methods: {
        ...mapActions([
          'GET_ALL_POSTS',
          'GET_ALL_USERS'
        ])
      },
      mounted() {
        this.GET_ALL_POSTS()
            .then(() => this.post = this.GET_POST_BY_ID(this.id))
            .then(() => this.GET_ALL_USERS())
            .then(() => this.userPost = this.GET_USER_BY_ID(this.post.userId));
      }
    }
</script>

<style lang="less" scoped>
    .singlePost {
        width: 1200px;
        margin: 0 auto;

        &__back {
            width: 100px;
            height: 50px;
            font-size: 20px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            transition: .3s;

            &:hover {
                background-color: #000;
                color: #fff;
                transition: .3s;
            }
        }
    }
</style>
