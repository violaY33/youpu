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
  margin: 10px;
  padding: 10px;
  border: 1px solid #e8eaec;
  text-align: center;
  overflow: hidden;
  vertical-align: top;
}

.link {
  display: block;
  width: 117px;
  height: 117px;
  margin-bottom: 10px;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h2 {
  width: 117px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>

