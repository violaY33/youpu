<template>
    <div class="post">
        <div class="thumbnail">
            <router-link :to="'/details/'+ postData.id">
                <img :src="postData.thumbnail" :alt="postData.title">
            </router-link>
        </div>
        <div class="title">
            <router-link :to="'/details/'+ postData.id">
                <h2>{{ postData.title }}</h2>
            </router-link>
        </div>
        <div class="info">
            <span class="category">
                <router-link :to="'/cate/'+postData.cate"><Icon type="ios-list-box-outline" /> {{ postData.source }}</router-link>
            </span>
            <span class="views">
                <Icon type="ios-eye-outline" /> {{ postData.views }}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PostCard',
        props: ['postData'],
    }
</script>


<style scoped>
.post {
    width: 300px;
    margin: 10px;
    border: 1px solid #e8eaec;
    border-radius: 5px;
    overflow: hidden;
}

.post:hover {
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
}

.thumbnail a {
    display: block;
    width: 300px;
    height: 200px;
}

.thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.title {
    padding: 0 10px;
}

.title h2{
    line-height: 2.5;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.info {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    border-top: 1px dashed #e8eaec;
}

.info span {
    line-height: 2.5;
}

.info i {
    vertical-align: baseline;
}

</style>


