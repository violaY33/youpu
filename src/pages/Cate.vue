<template>
	<div class="cate">
		<main class="content" ref="content">
			<div class="sec-1">
				<h2>合集：{{ cateName[cateId] }}</h2>
			</div>
			<div class="sec-2 expand-width clearfix">
				<PostCard v-for="(item, index) in postData" :postData="item" :key="'post-'+index"></PostCard>
				<div v-show="isLoad" class="tip-load tip-loading fl">
					正在玩命加载中 <br>(o゜▽゜)o☆
					<span class="spin-container">
						<Spin size="small" class="spin-item"></Spin>
						<Spin size="small" class="spin-item"></Spin>
						<Spin size="small" class="spin-item"></Spin>
					</span>
				</div>
				<div v-show="isEnd" class="tip-load tip-no-more fl">没有更多啦 <br> ≧ ﹏ ≦</div>
			</div>
		</main>
	</div>
</template>

<script>
import PostCard from './../components/PostCard.vue'
import infiniteScroll from './../assets/js/infinite-scroll.js'

export default {
	name: 'Cate',
	created() {
		this.$Loading.start()
		this.cateId = this.$route.params.cateSubId
			? this.$route.params.cateId + '/' + this.$route.params.cateSubId
			: this.$route.params.cateId

		console.log(this.cateId)
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
			cateId: '',
			currentPage: 1,
			postData: [],
			isEnd: false,
			isLoad: false,
			cateName: {
				"ty": "桃子鱼仔教室",
				"jc/nm": "柠檬音乐",
				"qtyy": "趣弹音乐",
				"pb": "白熊音乐",
				"jc/xy": "小鱼吉他屋",
				"jc/masusu": "马叔叔教学",
				"dfs": "大夫山Ukulele",
				"ykbb": "尤克宝贝",
				"fq": "番茄尤克里里",
				"jc/sir": "子熏乐器张Sir",
				"tanker": "弹客Tanker",
				"xx": "星弦音乐教室",
				"sy": "心忆尤克里里",
				"zm": "追梦音乐",
				"xxf": "小小凤",
				"jc/zuolun": "左轮吉他",
				"sasa": "小Sa神",
				"mk": "摩卡音乐",
				"ju": "加U音乐",
				"ysyh": "一树一花",
				"jieu": "解U尤克里里",
				"xyf": "弦音坊尤克里里",
				"zy": "子烨尤克里里",
				"sanni": "桑尼Ukulele",
				"cjy": "陈建廷入门24课",
				"zst": "张松涛"
			}
		}
	},
	components: {
		PostCard,
	},
	watch: {
		$route(to, from) {
			this.$Loading.start()
			this.currentPage = 1
			this.cateId = this.$route.params.cateSubId
				? this.$route.params.cateId + '/' + this.$route.params.cateSubId
				: this.$route.params.cateId
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
					.post('/cate', {
						cate: this.cateId,
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
					.post('/cate', {
						cate: this.cateId,
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
						this.isLoad = false;
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
