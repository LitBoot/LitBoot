<script setup>
const props = defineProps(['name', 'size'])
</script>

<template>
  <img src="../googleIcon.svg" :height="props.size" v-if="props.name === 'google'"/>
  <img src="../baiduIcon.svg" :height="props.size" v-if="props.name === 'baidu'"/>
  <img src="../bingIcon.svg" :height="props.size" v-if="props.name === 'bing'"/>
</template>

<style scoped>

</style>