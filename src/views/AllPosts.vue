<template>
    <div class="allPosts">
        <div class="allPosts__posts">
            <div v-for="post in $store.state.posts" :key="post.id">
                <Post :postData="post"/>
            </div>
        </div>
    </div>
</template>

<script>
  import Post from "../components/Post";

  export default {
    name: 'AllPosts',
    components: {
      Post
    }
  }
</script>

<style lang="less" scoped>
    .allPosts {
        width: 1200px;
        margin: 0 auto;

        &__posts {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }
</style>
