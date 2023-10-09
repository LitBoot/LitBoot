<script setup>
import MainClock from "./components/mainClock.vue";
import SearchBar from "./components/searchBar.vue";
import FavoriteDock from "./components/favoriteDock.vue";
import TopBar from "./components/topBar.vue";
import {computed, ref} from "vue";
import {getRandomWallpaper} from "./js/requests/wallpaper.js"

const focusMode = ref(false)
const bgAddress = ref("./assets/testBG2.png")

const bgBrightness = computed(()=>{
  if (focusMode.value === true) {
    return 0.25
  }
  else {
    return 0.7
  }
})

function getRandomBgPhoto() {
  getRandomWallpaper(1920).then((res)=>{
    bgAddress.value = res.data.url
  })
}

getRandomWallpaper()

function applyFocusMode(status) {
  console.log("Received the trigger: ", status)
  focusMode.value = status
}
</script>

<template>
  <div class="bgContainer"/>
  <top-bar @trigger-focus-status="applyFocusMode"/>
  <div class="container">
    <MainClock :on-focus-mode="focusMode"/>
    <DCarousel class="flipPageContainer" :autoplay="false" v-if="focusMode === false">
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
  filter: brightness(v-bind('bgBrightness'));
  z-index: 999;
  transition: all 0.1s;
}
.flipPageContainer {
  width: 90%;
  flex: 7;
  overflow: hidden;
}
</style>
