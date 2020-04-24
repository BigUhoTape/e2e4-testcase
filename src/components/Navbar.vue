<template>
    <div class="navbar">
        <router-link to="/" tag="li" class="navbar__link">All posts</router-link>
        <router-link to="/addPost" tag="li" class="navbar__link">Add post</router-link>
        <router-link to="/registration" tag="li" class="navbar__link">Registration</router-link>
    </div>
</template>

<script>
    export default {
      name: 'Navbar'
    }
</script>

<style lang="less" scoped></style>
