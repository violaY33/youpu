<template>
	<div class="search">
		<main class="content">
			<div class="sec-1 clearfix">
				<h2 class="fl">我的收藏</h2>
				<div class="admin-group fr">
					<div class="admin-opt" :class="showAdmin ? '' : 'hide'">
						<Checkbox :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
						<Button class="btn btn-admin fr" type="error" @click="handleDelete">删除</Button>
					</div>
					<Button class="btn btn-admin" @click="handleAdmin">{{ adminText }}</Button>
				</div>
			</div>
			<div class="sec-2 clearfix">
				<ul class="collection-list">
					<li class="collection-item clearfix" v-for="(item, index) in collectionData">
						<Checkbox class="fl" :class="showAdmin ? '' : 'hide'" :value="checkGroup[index]" @click.prevent.native="handleCheck(index, item.id)" />
						<h3 class="title fl">
							<router-link :to="'/details/' + item.id">{{ item.title }}</router-link>
						</h3>
						<router-link :to="'/cate/' + item.cate" class="cate fr">{{ item.source }}</router-link>
					</li>
				</ul>
			</div>
		</main>
		<div class="no-data" v-if="collectionData.length === 0">
			暂无数据，
			<router-link to="/">快去收藏吧(oﾟvﾟ)ノ GO >></router-link>
		</div>
		<Modal v-model="showDelModal" width="360">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>删除确认</span>
			</p>
			<div style="text-align:center">
				<p>您确定要删除所选择的{{ checkedId.length }}条记录吗？</p>
			</div>
			<div slot="footer">
				<Button type="error" size="large" long @click="delAll">删除</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
import PostCard from './../components/PostCard.vue'
import infiniteScroll from './../assets/js/infinite-scroll.js'

export default {
	name: 'Home',
	created() {
		this.$Loading.start()
		this.kw = this.$route.query.kw
	},
	mounted() {
		this.collectionData = JSON.parse(localStorage.collection);
		this.$Loading.finish()

	},
	data() {
		return {
			kw: '',
			currentPage: 1,
			checkAll: false,
			checkGroup: [], 
			checkedId: [], 
			collectionData: [], 
			showDelModal: false,
			showAdmin: false,
			adminText: '管理'
		}
	},
	components: {
		PostCard,
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
		handleAdmin() {
			if (this.collectionData.length === 0) {
				this.$Notice.error({
					title: '暂无可以管理的数据哦 ＞︿＜',
				});
			} else {
				this.showAdmin = !this.showAdmin;
				this.showAdmin ? this.adminText = '完成' : this.adminText = '管理';
			}
		},
		handleCheck(index, id) {
			if (!this.checkGroup[index]) {
				this.checkGroup[index] = true;
				this.checkGroup.splice(0, 0);
				this.checkedId.push(id);
			} else {
				this.checkGroup[index] = false;
				this.checkGroup.splice(0, 0);
				let curIdx = this.checkedId.indexOf(id);
				this.checkedId.splice(curIdx, 1);
			}
		},
		handleCheckAll() {
			this.checkAll = !this.checkAll;
			if (this.checkAll) {
				this.checkedId = [];
				for (let i = 0; i < this.collectionData.length; i++) {
					this.checkGroup[i] = true;
					this.checkedId.push(this.collectionData[i].id);
				}
			} else {
				this.checkedId = [];
				for (let i = 0; i < this.collectionData.length; i++) {
					this.checkGroup[i] = false;
				}
			}
		},
		handleDelete() {
			if (this.checkedId.length === 0) {
				this.$Notice.error({
					title: '没有选择需要删除的数据哦 ＞︿＜',
				});
			} else {
				this.showDelModal = true;
			}
		},
		delAll() {
			this.showDelModal = false;

			const collection = JSON.parse(localStorage.collection);
			for (let i = 0; i < this.checkedId.length; i++) {
				let curIdx;
				for (let j = 0; j < collection.length; j++) {
					if (this.checkedId[i] === collection[j].id) {
						curIdx = j;
					}
				}
				collection.splice(curIdx, 1);
			}
			this.checkGroup = [];
			this.checkAll = false;
			this.collectionData = collection;
			localStorage.collection = JSON.stringify(collection);

			if (this.collectionData.length === 0) {
				this.showAdmin = false;
				this.adminText = '管理';
			}

			this.$Notice.success({
				title: '已经成功删除 (●ˇ∀ˇ●)',
			});
		}

	},
}
</script>

<style lang="less" scoped>
.sec-1 {
  line-height: 27px;

  .admin-group > * {
    margin-right: 10px;
  }
  .admin-opt {
    display: inline-block;
    vertical-align: top;
  }
  .btn {
    height: 27px;
	padding: 0 20px;
	margin-right: 0;
    font-size: 14px;
    line-height: 25px;
    letter-spacing: 2px;
  }
}

.sec-2 {

  .collection-list {
    border-top: 1px dashed #e8eaec;
    .collection-item {
      list-style: none;
      border-bottom: 1px dashed #e8eaec;
      .title {
        font-size: 16px;
      }
      line-height: 50px;
    }
  }
}

.no-data {
  text-align: center;
}
</style>
