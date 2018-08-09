<template>
	<div class="home">
		<main class="content" ref="content">
			<Row type="flex" justify="center">
				<Col span="20" class="posts-container">
				<PostCard v-for="(item, index) in postData" :postData="item" :key="'post-'+index"></PostCard>
				</Col>
			</Row>
			<Row type="flex" justify="center">
				<Col span="24" style="text-align: center">
				<p v-show="isLoad">
					正在努力加载 (o゜▽゜)o☆
					<span class="spin-container">
						<Spin size="small"></Spin>
					</span>
				</p>
				<p v-show="isEnd">没有更多啦 ≧ ﹏ ≦</p>
				</Col>
			</Row>
		</main>

	</div>
</template>

<script>
import PostCard from './../components/PostCard.vue'
import infiniteScroll from './../assets/js/infinite-scroll.js'

export default {
	name: 'Home',
	created() {
		this.$Loading.start()
	},
	mounted() {
		this.getData()
			.then(res => {
				this.$Loading.finish()
			})
			.catch(err => {
				this.$Loading.error()
			})

		infiniteScroll(this.$refs.content, 200, this.getMoreData, this.isEnd)
	},
	data() {
		return {
			currentPage: 1,
			postData: [],
			isEnd: false,
			isLoad: false,
		}
	},
	components: {
		PostCard,
	},
	watch: {
		isEnd() {
			if (this.isEnd) {
				infiniteScroll(this.$refs.content, 200, this.getMoreData, this.isEnd)
			}
		},
	},
	methods: {
		getData() {
			return new Promise((resolve, reject) => {
				this.$http
					.post('/page', {
						currentPage: this.currentPage,
					})
					.then(res => {
						this.currentPage++
						this.postData = res.data
						resolve()
					})
					.catch(err => {
						console.log(err)
						reject()
					})
			})
		},
		getMoreData() {
			return new Promise((resolve, reject) => {
				this.isLoad = true
				this.$http
					.post('/page', {
						currentPage: this.currentPage,
					})
					.then(res => {
						if (res.data.length === 0) {
							this.isEnd = true
							resolve({
								isEnd: true,
							})
							this.isLoad = false
						} else {
							this.currentPage++
							this.postData.push(...res.data)
							resolve({
								isEnd: false,
							})
						}
					})
					.catch(err => {
						console.log(err)
						reject()
					})
			})
		},
	},
}
</script>

<style scoped>
</style>
