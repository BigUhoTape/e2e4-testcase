<template>
    <div class="post">
        <p class="post__id">1</p>
        <p class="post__title">title</p>
    </div>
</template>

<script>
    export default {
      name: 'Post',
    }
</script>

<style lang="less" scoped>
    .post {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 225px;
        height: 120px;
        margin-bottom: 50px;
        padding: 20px 20px 30px 20px;
        transition: .3s;

        &__id {
            font-size: 30px;
            margin: 0;
        }

        &__title {
            font-size: 18px;
            text-align: center;
        }

        &:hover {
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            border-radius: 7px;
            transition: .3s;
            cursor: pointer;
        }
    }
</style>
