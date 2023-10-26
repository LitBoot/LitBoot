<script setup>
import MainClock from "./components/mainClock.vue";
import SearchBar from "./components/searchBar.vue";
import FavoriteDock from "./components/favoriteDock.vue";
import TopBar from "./components/topBar.vue";
import {computed, ref} from "vue";
import {getRandomWallpaper} from "./js/requests/wallpaper.js"
import WallpaperSetupDialog from "./processedComponent/wallpaperSetupDialog.vue";
import SettingsDialog from "./processedComponent/settingsDialog.vue";

const focusMode = ref(false)
const searchMode = ref(false)
const bgAddress = ref("./assets/testBG2.png")
const wallpaperInfo = ref({
  start_date: "",
  end_date: "",
  url: "",
  copyright: "",
  copyright_link: ""
})
const displayWallpaperInfoDialog = ref(false)
const displaySettingsDialog = ref(false)
const wallpaperInfoDialogTab = ref("info")

const bgBrightness = computed(()=>{
  if (focusMode.value === true || searchMode.value === true) {
    return 0.35
  }
  else {
    return 0.5
  }
})

async function getRandomBgPhoto() {
  let res = await getRandomWallpaper(1920)
  console.log(res.data.url)
  wallpaperInfo.value = res.data
  document.getElementById("bg").style.backgroundImage = "url(" + res.data.url + ")"
}

if (localStorage.getItem("wallpaper:enabled") === null) {
  localStorage.setItem("wallpaper:enabled", "true")
}
else if (localStorage.getItem("wallpaper:enabled") === "true") {
  getRandomBgPhoto()
}
else {
  console.log("Skipped online wallpaper process")
}

function applyFocusMode(status) {
  console.log("Received the trigger: ", status)
  focusMode.value = status
}
</script>

<template>

  <div class="bgContainer" id="bg"/>
  <top-bar
      @trigger-focus-status="applyFocusMode"
      @trigger-wallpaper-dialog="displayWallpaperInfoDialog = true"
      @trigger-settings-dialog="displaySettingsDialog = true"
  />
  <wallpaper-setup-dialog :wallpaper-info="wallpaperInfo" v-if="displayWallpaperInfoDialog === true" @on-dialog-close="displayWallpaperInfoDialog = false"/>
  <settings-dialog @onDialogClose="displaySettingsDialog = false" v-if="displaySettingsDialog">

  </settings-dialog>
  <div class="container">
    <MainClock v-if="focusMode" :on-focus-mode="focusMode"/>
    <DCarousel class="flipPageContainer" :autoplay="false" v-if="focusMode === false">
      <div class="carousel-item">
        <MainClock v-if="!focusMode" :on-focus-mode="focusMode"/>
        <search-bar style="margin-top: 5px" @on-search="searchMode = true" @on-end-search="searchMode = false"/>
      </div>
      <div class="carousel-item">
        <h2>收藏夹正在开发中！</h2>
        <div>请等待LitBoot官方的更新信息，我们已经在努力开发！</div>
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
  margin-top: 7%;
}
</style>
