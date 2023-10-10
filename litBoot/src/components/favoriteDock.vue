<script setup>

import FavoriteBarIcon from "../UIComponent/favoriteBarIcon.vue";
</script>

<template>
<div class="dockContainer">
  <div class="dockContentContainer">
    <favorite-bar-icon favorite-name="Google" url="https://www.google.com" icon="google" :icon-height="30"/>
    <favorite-bar-icon favorite-name="Bing" url="https://www.bing.com" icon="bing" :icon-height="30"/>
    <favorite-bar-icon favorite-name="Baidu" url="https://www.baidu.com" icon="baidu" :icon-height="30"/>
  </div>
</div>
</template>

<style scoped>
.dockContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
  flex: 1;
}
.dockContentContainer {
  margin: 5px;
  border-radius: 10px;
  background-color: rgba(30, 29, 29, 0.5);
  backdrop-filter: blur(10px);
  color: white;
  padding: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>