<template>
    <div class="allPosts">
        <div class="allPosts__posts">
            <div v-for="post in itemsOnPage" :key="post.id">
                <Post :postData="post"/>
            </div>
        </div>
        <Paginate v-model="page"
                  :page-count="pageCount"
                  :click-handler="changePagePagination"
                  :prev-text="'Prev'"
                  :next-text="'Next'"
                  :container-class="'pagination'"
                  :page-class="'page'"
                  :page-link-class="'page-link'"
                  :prev-class="'page'"
                  :prev-link-class="'page-link opt'"
                  :next-class="'page'"
                  :next-link-class="'page-link opt'"
                  :active-class="'activeClass'"
        />
    </div>
</template>

<script>
  import Post from "../components/Post";
  import Paginate from 'vuejs-paginate'
  import paginationMixin from './../mixins/pagination.mixin'

  export default {
    name: 'AllPosts',
    components: {
      Post,
      Paginate
    },
    mixins: [paginationMixin],
    watch: {
      posts() {
        this.setupPagination(this.posts)
      }
    },
    computed: {
      posts() {
        const posts = this.$store.state.posts;
        return posts;
      }
    },
    mounted() {
        this.setupPagination(this.posts);
    }
  }
</script>

<style lang="less">
    .allPosts {
        width: 1200px;
        margin: 0 auto;

        &__posts {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }

    .pagination {
        display: flex;
        justify-content: center;
        width: 0;
        margin: 0 auto;
        margin-top: 30px;
        list-style: none;
    }
    .page {
        margin-right: 5px;
    }
    .page-link {
        display: inline;
        padding: 20px;
        border: 1px solid #000;
        border-radius: 5px;
        font-size: 20px;
        transition: .4s;
        &:focus {
            outline: none;
        }
        &:hover {
            background-color: #000000;
            color: #D2D2D2;
            transition: .4s;
        }
    }
    .opt {
        background-color: #343434;
        color: #D2D2D2;
    }
</style>
