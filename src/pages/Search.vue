<template>
	<div class="search">
		<main class="content" ref="content">
			<div class="sec-1">
				<h2>“{{ kw }}”的搜索结果</h2>
			</div>
			<div class="sec-2 expand-width clearfix">
				<PostCard v-for="(item, index) in postData" :postData="item" :key="'post-'+index"></PostCard>
				<Loading :isLoading="isLoading" :isEnd="isEnd"></Loading>
			</div>
		</main>
	</div>
</template>

<script>
import PostCard from './../components/PostCard.vue'
import Loading from './../components/Loading.vue'
import infiniteScroll from './../assets/js/infinite-scroll.js'

export default {
	name: 'Home',
	created() {
		this.$Loading.start()
		this.kw = this.$route.query.kw
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
			kw: '',
			currentPage: 1,
			postData: [],
			isEnd: false,
			isLoading: false,
		}
	},
	components: {
		PostCard,
		Loading
	},
	watch: {
		$route(to, from) {
			this.$Loading.start()
			this.currentPage = 1
			this.kw = this.$route.query.kw
			this.getData()
				.then(res => {
					this.$Loading.finish()
				})
				.catch(err => {
					this.$Loading.error()
				})
			infiniteScroll(this.$refs.content, 200, this.getMoreData, this.isEnd)
		},
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
					.post('/search', {
						kw: this.kw,
						currentPage: this.currentPage,
					})
					.then(res => {
						if (res.data.length === 0) {
							this.isEnd = true
							resolve()
						} else {
							this.currentPage++
							this.postData = res.data
							resolve()
						}
					})
					.catch(err => {
						console.log(err)
						reject()
					})
			})
		},

		getMoreData() {
			return new Promise((resolve, reject) => {
				this.isLoading = true
				this.$http
					.post('/search', {
						kw: this.kw,
						currentPage: this.currentPage,
					})
					.then(res => {
						if (res.data.length === 0) {
							this.isEnd = true
							resolve()
							this.isLoading = false
						} else {
							this.currentPage++
							this.postData.push(...res.data)
							resolve()
						}
					})
					.catch(err => {
						this.isLoading = false;
						console.log(err)
						reject()
					})
			})
		},
	},
}
</script>

<style scoped>
.sec-2 {
  margin-right: -10px;
}
</style>
