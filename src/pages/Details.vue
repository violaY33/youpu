<template>
	<div class="details">
		<main class="post-content">
			<div class="wrap">
				<h2>{{ postData.title }}</h2>
				<h3>♩ 谱子</h3>
				<img v-for="(item, index) in postData.pics" :src="item" :key="'pic-'+index">
				<h3 v-if="postData.videos && postData.videos.length > 0">♫ 教学视频</h3>
				<iframe v-for="(item, index) in postData.videos" :src="item" frameborder="0"></iframe>
			</div>
		</main>
		<div class="related">
			<div class="wrap">
				<h2>相关推荐</h2>
				<h3 v-for="(item, index) in relatedData" :key="'related-'+index">
					<router-link :to="'/details/'+ item.id">{{ item.title }}</router-link>
				</h3>
			</div>
		</div>
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
	},
	data() {
		return {
			postId: this.$route.params.id,
			postData: {},
			relatedData: {},
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
			this.$http
				.post('/details', {
					postId,
				})
				.then(res => {
					this.postData = res.data
					this.$Loading.finish()
					document.body.scrollTop = 0
					document.documentElement.scrollTop = 0
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
	},
}
</script>

<style scoped>
h2 {
	margin: 10px 0;
}

h3 {
	margin: 10px 0;
}

.post-content {
	display: flex;
	justify-content: center;
	margin-top: 50px;
	padding: 10px;
}

.post-content .wrap {
	width: 860px;
}

img {
	width: 100%;
	margin-bottom: 20px;
}

img:first-of-type {
	margin-bottom: 0;
}

iframe {
	width: 100%;
	height: 600px;
	margin-bottom: 20px;
}

@media screen and (max-width: 768px) {
	iframe {
		height: 400px;
	}
}

.related {
	display: flex;
	justify-content: center;
	margin-bottom: 60px;
	padding: 0 10px;
}

.related .wrap {
	width: 860px;
	margin-top: 10px;
	border-top: 1px dashed #e8eaec;
}
</style>

