<template>
    <div class="loading fl" :class="isEnd ? 'full-width' : ''">
        <div v-show="isLoading" class="tip-load tip-loading fl">
            正在玩命加载中<br />(o゜▽゜)o☆
            <span class="spin-container">
                <Spin size="small" class="spin-item"></Spin>
                <Spin size="small" class="spin-item"></Spin>
                <Spin size="small" class="spin-item"></Spin>
            </span>
        </div>
        <div v-show="isEnd" class="tip-load tip-no-more fl">没有更多啦<br />≧ ﹏ ≦</div>
    </div>
</template>

<script>
export default {
    name: 'Loading',
    props: ['isLoading', 'isEnd']
}    
</script>

<style lang="less" scoped>
.tip-load {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 280px;
  margin: 0 10px 10px 0;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
  overflow: hidden;

  &.tip-loading {
    width: 237px;
  }

  &.tip-no-more {
    width: 100%;
  }

  .spin-container {
    display: flex;
    margin-top: 10px;
  }
}

.full-width {
  width: 100%;
}
</style>

