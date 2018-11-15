<template>
	<header class="header">
		<div class="width-limit clearfix">
			<div class="logo fl">
				<h1>
					<router-link to="/">尤谱网</router-link>
				</h1>
			</div>
			<div class="collection fr"><router-link to="collection">我的收藏</router-link></div>
			<div class="cates fr">
				<ul class="nav">
					<li class="cates-item">
						<router-link to="/cate/qtyy">趣弹音乐</router-link>
					</li>
					<li class="cates-item">
						<router-link to="/cate/pb">白熊音乐</router-link>
					</li>
					<li class="cates-item">
						<router-link to="/cate/ty">桃子&鱼仔</router-link>
					</li>
					<li class="cates-item">
						<router-link to="/cates">更多合集</router-link>
					</li>
				</ul>
			</div>
			<div class="search fr">
				<Input search placeholder="请输入搜索内容" size="default" class="search" v-model="searchText" @on-search="search" />
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: 'NavHeader',
	data() {
		return {
			displayMenu: false,
			searchText: '',
		}
	},
	methods: {
		toggleMenu() {
			this.displayMenu = !this.displayMenu
		},
		hideMenu() {
			this.displayMenu = false
		},
		search() {
			this.displayMenu = false
			if (this.searchText) {
				this.$router.push({
					name: 'search',
					query: {
						kw: this.searchText,
					},
				})
				this.searchText = ''
			}
		},
	},
}
</script>


<style lang="less" scoped>
.header {
  position: fixed;
  z-index: 1;
  top: 0;
  width: 100%;
  line-height: 50px;
  border-bottom: 1px solid #e7e7e7;
  background-color: #fff;
}

.width-limit {
	width: 1200px;
	margin: 0 auto;
}

.cates {
	.cates-item {
		display: inline-block;
		margin-left: 20px;
	}
}

.collection {
	margin-left: 30px;
}

</style>

