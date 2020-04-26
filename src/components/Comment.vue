<template>
    <div class="comment">
        <div v-for="(comment, i) in comments" :key="i">
            <h4 class="comment__title">{{comment.name}}  <span>{{comment.email}}</span></h4>
            <p class="comment__body">{{comment.body}}</p>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
      name: 'Comment',
      data() {
        return {
          id: this.$route.params.id,
          comments: []
        }
      },
      methods: {
        ...mapActions([
          'GET_COMMENT_BY_ID'
        ])
      },
      computed: {
        ...mapGetters([
          'COMMENT_ID'
        ])
      },
      mounted() {
        if (!this.$store.state.comments[this.id]) {
          this.GET_COMMENT_BY_ID(this.id)
            .then(() => this.comments = this.COMMENT_ID(this.id))
        } else {
          return this.comments = this.COMMENT_ID(this.id);
        }
      }
    }
</script>

<style lang="less" scoped>
    .comment {
        width: 1000px;
        margin: 0 auto;
        margin-top: 50px;

        &__title {
            font-size: 30px;

            span {
                font-size: 20px;
                color: gray;
            }
        }

        &__body {
            font-size: 25px;
        }
    }
</style>
