<template>
    <div class="sibglePost">{{post.id}}</div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
      name: 'SinglePost',
      data() {
        return {
          id: this.$route.params.id,
          post: {}
        }
      },
      computed: {
        ...mapGetters([
          'GET_POST_BY_ID'
        ])
      },
      mounted() {
        this.GET_POST_BY_ID(this.id);
      }
    }
</script>

<style lang="less" scoped></style>
