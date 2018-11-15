<template>
    <div class="cates">
        <main>
            <div class="sec-1">
                <h2>所有合集</h2>
            </div>
            <div class="sec-2 clearfix">
                <CateItem v-for="(item, index) in cateData" :cateData="item" :key="'cate-'+index"></CateItem>
            </div>
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

