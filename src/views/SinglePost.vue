<template>
    <div class="sibglePost">{{id}}</div>
</template>

<script>
    export default {
      name: 'SinglePost',
      data() {
        return {
          id: this.$route.params.id
        }
      }
    }
</script>

<style lang="less" scoped></style>
