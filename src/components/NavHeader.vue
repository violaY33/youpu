<template>
    <header class="header">
        <Row type="flex" justify="space-between" class="header-pc">
            <Col span="8" class="hearder-l logo">
            <h1>
                <router-link to="/">尤谱网</router-link>
            </h1>
            </Col>
            <Col span="16" class="header-r">
            <Input search placeholder="请输入搜索内容" size="default" class="search" v-model="searchText" @on-search="search" />
            <ul class="nav">
                <li>
                    <router-link to="/cate/qtyy">趣弹音乐</router-link>
                </li>
                <li>
                    <router-link to="/cate/pb">白熊音乐</router-link>
                </li>
                <li>
                    <router-link to="/cate/ty">桃子&鱼仔</router-link>
                </li>
                <li>
                    <router-link to="/cates">更多合集</router-link>
                </li>
            </ul>
            </Col>
        </Row>
        <Row type="flex" justify="space-between" class="header-mobile">
            <Col span="2"></Col>
            <Col span="10" class="hearder-l logo">
            <h1>
                <router-link to="/">尤谱网</router-link>
            </h1>
            </Col>
            <Col span="10" class="header-r">
            <Icon type="ios-menu-outline" class="menu" @click="toggleMenu" />
            </Col>
            <Col span="2"></Col>
        </Row>
        <Row type="flex" justify="space-between" class="mobile-menu" v-show="displayMenu">
            <Col span="24">
            <Row type="flex">
                <Col span="2"></Col>
                <Col span="20">
                    <div class="menu-card">
                        <CellGroup @on-click="hideMenu">
                            <Cell title="趣弹音乐" to="/cate/qtyy" />
                            <Cell title="白熊音乐" to="/cate/pb" />
                            <Cell title="桃子&鱼仔" to="/cate/ty"/>
                            <Cell title="更多合集" to="/cates"/>
                        </CellGroup>
                        <Input search placeholder="请输入搜索内容" size="default" class="search" v-model="searchText" @on-search="search" />
                    </div>
                </Col>
                <Col span="2"></Col>
            </Row>

            </Col>
        </Row>

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


<style scoped>
.header {
    position: fixed;
    top: 0;
	width: 100%;
	background-color: #fff;
	z-index: 999;
}

@media screen and (max-width: 768px) {
	.header-pc {
		display: none;
	}
	.header-mobile {
		display: flex;
	}
}

@media screen and (min-width: 768px) {
	.header-pc {
		display: flex;
	}
	.header-mobile {
		display: none;
	}
	.mobile-menu {
		display: none;
	}
}

.header-mobile {
	height: 50px;
	line-height: 50px;
	border-bottom: 1px solid #e8eaec;
}

.header-mobile .header-r {
	display: flex;
	justify-content: flex-end;
}

.header-mobile .menu {
	font-size: 2em;
	line-height: 50px;
	cursor: pointer;
}

.mobile-menu {
	position: absolute;
	z-index: 999;
	width: 100%;
	border-bottom: 1px solid #e8eaec;
	border-radius: 0 0px 5px 5px;
	box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}


.mobile-menu .search {
	padding: 7px 16px;
}

.header-pc {
	height: 50px;
	padding: 0 20px;
	line-height: 50px;
	border-bottom: 1px solid #e8eaec;
}

.header-pc .header-r {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.header-pc .search {
	width: 20%;
}

.header-pc .nav {
	display: flex;
	justify-content: flex-end;
}

.header-pc .nav li {
	display: inline-block;
	margin-left: 20px;
}

</style>

