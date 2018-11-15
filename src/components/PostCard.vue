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
    <div class="info clearfix">
      <span class="category fl">
        <router-link :to="'/cate/'+postData.cate">
          <Icon type="ios-list-box-outline" />{{ postData.source }}</router-link>
      </span>
      <span class="collection fr" @click="handleCollect">
        <Icon :type="starIcon" :class="hasCollected ? 'collected' : ''" />
      </span>
      <span class="views fr">
        <Icon type="ios-eye-outline" /> {{ postData.views }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: ['postData'],
  data() {
    return {
      starIcon: 'md-star-outline',
      hasCollected: false
    }
  },
  mounted() {
    const collection = JSON.parse(localStorage.collection);
    if (collection.length > 0) {
      for (let i = 0; i < collection.length; i++) {
        if (collection[i].id === this.postData.id) {
          this.hasCollected = true;
          this.starIcon = 'md-star';
        }
      }
    }


  },
  methods: {
    handleCollect() {
      //如果没收藏
      if (!this.hasCollected) {
        this.hasCollected = true;
        this.starIcon = 'md-star';

        const collection = JSON.parse(localStorage.collection);
        collection.push({
          cate: this.postData.cate,
          id: this.postData.id,
          source: this.postData.source,
          title: this.postData.title
        });
        localStorage.collection = JSON.stringify(collection);
        this.$Notice.success({
          title: '已添加到收藏夹O(∩_∩)O',
        });
      } else {
        //如果已收藏
        this.hasCollected = false;
        this.starIcon = 'md-star-outline';

        const collection = JSON.parse(localStorage.collection);

        //找出index 并删除
        let curIdx;

        for (let i = 0; i < collection.length; i++) {
          if (collection[i].id === this.postData.id) {
            curIdx = i;
            break;
          }
        }

        collection.splice(curIdx, 1);
        localStorage.collection = JSON.stringify(collection);
        this.$Notice.success({
          title: '已为您取消收藏>"<',
        });
      }
    }
  }
}
</script>


<style lang="less" scoped>
.post {
  float: left;
  box-sizing: border-box;
  width: 237px;
  margin: 0 10px 10px 0;
  border: 1px solid #e8eaec;
  border-radius: 5px;
  overflow: hidden;
  &:hover {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  }
}

.thumbnail {
  a {
    display: block;
    width: 300px;
    height: 200px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.title {
  padding: 0 10px;

  h2 {
    line-height: 2.5;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}

.info {
  padding: 0 10px;
  border-top: 1px dashed #e8eaec;

  .category {
    max-width: 110px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  span {
    line-height: 2.5;
  }
  i {
    font-size: 16px;
    line-height: 31px;
    vertical-align: top;
  }
  .collection {
    margin-left: 10px;
    cursor: pointer;

    & .collected {
      color: yellow;
    }
  }
}
</style>


