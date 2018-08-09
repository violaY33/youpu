<template>
  <div id="app">
    <NavHeader></NavHeader>
    <router-view></router-view>
    <BackTop></BackTop>
  </div>
</template>

<script>
import NavHeader from './components/NavHeader';
export default {
  name: 'App',
	components: {
		NavHeader,
  }
};
</script>

