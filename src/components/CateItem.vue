<template>
    <div class="cate-item">
        <router-link :to="'/cate/'+cateData.cate" class="link">
            <img :src="cateData.pic">
        </router-link>
        <h2>
             <router-link :to="'/cate/'+cateData.cate">
                {{ cateData.title }}
             </router-link>
        </h2>
    </div>
</template>

<script>
export default {
    name: 'CateItem',
    props: ['cateData']
}    
</script>

<style scoped>
    .cate-item {
        display: inline-block;
        width: 80px;
        margin: 10px;
        text-align: center;
        overflow: hidden;
        vertical-align: top;
    }

    .link {
        display: block;
        width: 80px;
        height: 80px;
        margin-bottom: 10px;
        border: 1px solid #e8eaec;
        border-radius: 50%;
        overflow: hidden;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

</style>

