<template>
    <div class="cates">
        <main class="content" ref="content">
            <Row type="flex" justify="center">
                <Col :lg="16" :sm="22" class="cates-container">
                <CateItem v-for="(item, index) in cateData" :cateData="item" :key="'cate-'+index"></CateItem>
                </Col>
            </Row>
        </main>
    </div>
</template>

<script>
import CateItem from './../components/CateItem'
export default {
	name: 'Cates',
	data() {
		return {
			cateData: []
		}
	},
	created() {
        this.$http.get('/cates.json').then(res => {
            this.cateData = res.data
        }).catch(err => {
            console.log(err)
        })
    },
	components: {
		CateItem,
	},
}
</script>



<style scoped>
.cates-container {
    text-align: center;
}

</style>

