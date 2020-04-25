<template>
    <div class="comment">
        <h4 class="comment__title">{{commentData.name}}  <span>{{commentData.email}}</span></h4>
        <p class="comment__body">{{commentData.body}}</p>
    </div>
</template>

<script>
    export default {
      name: 'Comment',
      props: {
        commentData: {
          type: Object,
          default() {
            return {}
          }
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
