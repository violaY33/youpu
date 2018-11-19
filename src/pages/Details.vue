<template>
	<div class="details">
		<main class="post-content">
			<div class="sec-1 clearfix">
				<h2 class="fl">{{ postData.title }}</h2>
				<Button class="btn-collection fr" size="small" type="default" @click="handleCollection">{{ hasCollected ? '已收藏' : '加入收藏' }}</Button>
			</div>
			<div class="sec-2">
				<h3>♩ 谱子</h3>
				<img v-for="(item, index) in postData.pics" :src="item" :key="'pic-'+index">
			</div>
			<div class="sec-3">
				<h3 v-if="postData.videos && postData.videos.length > 0">♫ 教学视频</h3>
				<iframe v-for="(item, index) in postData.videos" :src="item" frameborder="0"></iframe>
			</div>
			<div class="sec-4 related">
				<h2>相关推荐</h2>
				<h3 v-for="(item, index) in relatedData" :key="'related-'+index">
					<router-link :to="'/details/'+ item.id">{{ item.title }}</router-link>
				</h3>
			</div>
		</main>
	</div>
</template>

<script>
export default {
	name: 'Details',
	created() {
		this.$Loading.start()
	},
	mounted() {
		this.getData(this.postId)
		const collection = JSON.parse(localStorage.collection);
		if (collection.length > 0) {
			for (let i = 0; i < collection.length; i++) {
				if (collection[i].id === this.postId) {
					this.hasCollected = true;

					break;
				}
			}
		}
	},
	data() {
		return {
			postId: this.$route.params.id,
			postData: {},
			relatedData: {},
			hasCollected: false,
		}
	},
	components: {
	},
	watch: {
		$route(to, from) {
			this.$Loading.start()
			this.postId = this.$route.params.id
			this.getData(this.postId)
		},
	},
	methods: {
		getData(postId) {
			const self = this;
			this.$http
				.post('/details', {
					postId,
				})
				.then(res => {
					this.postData = res.data
					this.$Loading.finish()
					document.body.scrollTop = 0
					document.documentElement.scrollTop = 0
					document.title = self.postData.title

				})
				.catch(err => {
					this.$Loading.error()
					console.log(err)
				})

			this.$http
				.post('/related', {
					postId,
				})
				.then(res => {
					this.relatedData = res.data
				})
				.catch(err => {
					this.$Loading.error()
					console.log(err)
				})
		},
		handleCollection() {
			this.hasCollected = !this.hasCollected;
			const collection = JSON.parse(localStorage.collection);
			if (this.hasCollected) {
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
	},
}
</script>

<style lang="less" scoped>
h3 {
  margin: 10px 0;
  font-size: 16px;
}

.post-content {
  width: 860px;
}

img {
  display: block;
  max-width: 100%;
  margin: 0 auto 20px;
  &:last-of-type {
    margin-bottom: 0;
  }
}

iframe {
  display: block;
  width: 487px;
  height: 320px;
  margin: 0 auto 20px;
}

.related {
  border-top: 1px dashed #e8eaec;
  padding-top: 10px;
}

.btn-collection {
  height: 27px;
  line-height: 27px;
  padding: 0 20px;
  vertical-align: baseline;
}
</style>

