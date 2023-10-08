<script setup>
import MainClock from "./components/mainClock.vue";
import SearchBar from "./components/searchBar.vue";
import FavoriteDock from "./components/favoriteDock.vue";
import TopBar from "./components/topBar.vue";
</script>

<template>
  <div class="bgContainer"/>
  <top-bar/>
  <div class="container">
    <MainClock/>
<!--    <div class="flipPageContainer">-->
<!--      <search-bar/>-->
<!--    </div>-->
    <DCarousel class="flipPageContainer" :autoplay="false">
      <div class="carousel-item">
        <search-bar/>
      </div>
      <div class="carousel-item">
        <h2>小工具正在开发中！</h2>
        <div>请等待LitBoot官方的更新信息，我们已经在努力开发！</div>
      </div>
    </DCarousel>
    <favorite-dock/>
  </div>
</template>

<style scoped>
.container {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: white;
  z-index: 1000;
  background-color: rgba(0,0,0,0);
}
.bgContainer {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-image: url("./assets/testBG2.png");
  background-position: center center;
  background-size: cover;
  filter: brightness(0.7);
  z-index: 999;
}
.flipPageContainer {
  width: 90%;
  flex: 7;
  overflow: hidden;
}
</style>
