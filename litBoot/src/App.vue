<script setup>
import MainClock from "./components/mainClock.vue";
import SearchBar from "./components/searchBar.vue";
import FavoriteDock from "./components/favoriteDock.vue";
import TopBar from "./components/topBar.vue";
import {computed, ref} from "vue";
import {getRandomWallpaper} from "./js/requests/wallpaper.js"
import DivideBox from "./UIComponent/divideBox.vue";
import MenuItem from "./UIComponent/menuItem.vue";

const focusMode = ref(false)
const bgAddress = ref("./assets/testBG2.png")
const displayWallpaperInfoDialog = ref(false)

const bgBrightness = computed(()=>{
  if (focusMode.value === true) {
    return 0.25
  }
  else {
    return 0.5
  }
})

async function getRandomBgPhoto() {
  let res = await getRandomWallpaper(1920)
  console.log(res.data.url)
  document.getElementById("bg").style.backgroundImage = "url(" + res.data.url + ")"
}

getRandomBgPhoto()

function applyFocusMode(status) {
  console.log("Received the trigger: ", status)
  focusMode.value = status
}
</script>

<template>
  <divide-box v-if="displayWallpaperInfoDialog" @onClose="displayWallpaperInfoDialog = !displayWallpaperInfoDialog">
    <template #title>壁纸</template>
    <template #menu>
      <menu-item>壁纸信息</menu-item>
      <menu-item>在线壁纸偏好设置</menu-item>
      <menu-item>自定义壁纸</menu-item>
    </template>
  </divide-box>
  <div class="bgContainer" id="bg"/>
  <top-bar
      @trigger-focus-status="applyFocusMode"
      @trigger-wallpaper-dialog="displayWallpaperInfoDialog = true"
  />
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
