<script setup>
import MainClock from "./components/mainClock.vue";
import SearchBar from "./components/searchBar.vue";
import FavoriteDock from "./components/favoriteDock.vue";
import TopBar from "./components/topBar.vue";
import {computed, ref} from "vue";
import {getRandomWallpaper} from "./js/requests/wallpaper.js"
import DivideBox from "./UIComponent/divideBox.vue";
import MenuItem from "./UIComponent/menuItem.vue";
import StaticListContent from "./UIComponent/staticListContent.vue";

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
const wallpaperInfoDialogTab = ref("info")

const bgBrightness = computed(()=>{
  if (focusMode.value === true || searchMode.value === true) {
    return 0.25
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
      <menu-item @click="wallpaperInfoDialogTab = 'info'">壁纸信息</menu-item>
      <menu-item @click="wallpaperInfoDialogTab = 'onlinePreference'">在线壁纸偏好设置</menu-item>
      <menu-item @click="wallpaperInfoDialogTab = 'offlinePreference'">自定义壁纸</menu-item>
    </template>
    <template #content>
      <template v-if="wallpaperInfoDialogTab === 'info'">
        <h2>壁纸信息</h2>
        <div style="margin-bottom: 15px">查看壁纸的属性与版权信息</div>
        <a-alert type="info" message="图片来源于必应，未经允许，请不要随意传播。若需要更改相关设置，您可以前往在线壁纸编号设置更改相关设置"/>
        <static-list-content>
          <div>©版权所有：{{wallpaperInfo.copyright}}</div>
          <a-button type="link" :href="wallpaperInfo.copyright_link">前往版权页面</a-button>
        </static-list-content>
      </template>
      <template v-if="wallpaperInfoDialogTab === 'onlinePreference'">
        <h2>在线壁纸偏好设置</h2>
      </template>
      <template v-if="wallpaperInfoDialogTab === 'offlinePreference'">
        <h2>自定义壁纸</h2>
      </template>
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
        <search-bar @on-search="searchMode = true" @on-end-search="searchMode = false"/>
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
}
</style>
