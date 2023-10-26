<script setup>
import MenuItem from "../UIComponent/menuItem.vue";
import DivideBox from "../UIComponent/divideBox.vue";
import NormalItemBox from "../UIComponent/normalItemBox.vue";
import {ref} from "vue";
import {supportedResolutions, supportedRegions, getWallpaperRequestsInfo, defaultValues, setWallpaperRequestsInfo} from "../js/requests/wallpaper.js"
import UButton from "../UIComponent/UButton.vue";
import OptionSelector from "../UIComponent/optionController/optionSelector.vue";
import {message} from "ant-design-vue";

const emits = defineEmits(['onDialogClose'])
const props = defineProps(['wallpaperInfo'])
const wallpaperInfoDialogTab = ref("info")
const isEnableDailyImage = ref(localStorage.getItem("wallpaper:enabled") === "true")
const settingsInfo = ref({
  resolution: "",
  region: "",
  options: {
    resolutionOptions: [
      {
        key: "低",
        value: supportedResolutions.Fast
      },
      {
        key: "中",
        value: supportedResolutions.Normal
      },
      {
        key: "高",
        value: supportedResolutions.FourK
      }
    ],
    regionOptions: [
      {
        key: "中国",
        value: supportedRegions.China
      },
      {
        key: "日本",
        value: supportedRegions.Japan
      },
      {
        key: "澳大利亚",
        value: supportedRegions.Australia
      },
      {
        key: "英国",
        value: supportedRegions.British
      },
      {
        key: "德国",
        value: supportedRegions.German
      },
      {
        key: "加拿大",
        value: supportedRegions.Canada
      },
      {
        key: "随机",
        value: supportedRegions.Random
      },
    ]
  },
})
getWallpaperRequestsInfo(defaultValues.resolutionKeyName).then((res)=>{
  settingsInfo.value.resolution = res
})
getWallpaperRequestsInfo(defaultValues.regionKeyName).then((res)=>{
  settingsInfo.value.region = res
})

function triggerSetResolution(targetKey, targetResolution) {
  setWallpaperRequestsInfo(defaultValues.resolutionKeyName, targetResolution).then((res)=>{
    if (res) {
      message.success("设置成功！")
      // update the current value
      settingsInfo.value.resolution = targetKey
    }
    else {
      message.error ("设置失败！")
    }
  })
}

function triggerSetRegion(targetKey, targetRegion) {
  setWallpaperRequestsInfo(defaultValues.regionKeyName, targetRegion).then((res)=>{
    if (res) {
      message.success("设置成功！")
    }
    else {
      message.error("设置失败")
    }
  })
}
const ENABLE_ONLINE_WALLPAPER = "true";
const DISABLE_ONLINE_WALLPAPER = "false";

function triggerEnableOnlineWallpaper() {
  if (localStorage.getItem("wallpaper:enabled") === null) {
    localStorage.setItem("wallpaper:enabled", "true")
  }
  else {
    localStorage.setItem("wallpaper:enabled", isEnableDailyImage.value.toString())
  }
}

function triggerOnDialogClose() {
  emits('onDialogClose')
}
</script>

<template>
  <divide-box @onClose="triggerOnDialogClose">
    <template #title>壁纸</template>
    <template #menu>
      <menu-item @click="wallpaperInfoDialogTab = 'info'" v-if="isEnableDailyImage">壁纸信息</menu-item>
      <menu-item @click="wallpaperInfoDialogTab = 'onlinePreference'" v-if="isEnableDailyImage">在线壁纸偏好设置</menu-item>
      <menu-item @click="wallpaperInfoDialogTab = 'offlinePreference'">自定义壁纸</menu-item>
    </template>
    <template #content>
      <template v-if="wallpaperInfoDialogTab === 'info'">
        <h2>壁纸信息</h2>
        <div style="margin-bottom: 15px">查看壁纸的属性与版权信息</div>
        <a-alert type="info" message="图片来源于必应，未经允许，请不要随意传播。若需要更改相关设置，您可以前往在线壁纸编号设置更改相关设置"/>
        <normal-item-box>
          <template #title>图片版权信息</template>
          <template #description>{{props.wallpaperInfo.copyright}}</template>
          <template #action>
            <UButton @click="location.href = props.wallpaperInfo.copyright_link">前往版权信息页面</UButton>
<!--            <a-button type="primary" :href="props.wallpaperInfo.copyright_link">前往版权信息页面</a-button>-->
          </template>
        </normal-item-box>
      </template>
      <template v-if="wallpaperInfoDialogTab === 'onlinePreference'">
        <h2>在线壁纸偏好设置</h2>
        <div style="margin-bottom: 15px">修改在线壁纸推荐的偏好设置</div>
        <normal-item-box>
          <template #title>分辨率</template>
          <template #description>调整壁纸的清晰度，更低的清晰度会有更快的加载速度，更高的清晰度在网速较慢时加载更慢</template>
          <template #action>
            <option-selector @onSelectionChange="triggerSetResolution" :initial-value="settingsInfo.resolution" :options="settingsInfo.options.resolutionOptions" title="选择分辨率" description="选择一个合适的分辨率。越高的分辨率加载速度越慢，反之亦然。"/>
          </template>
        </normal-item-box>
        <normal-item-box>
          <template #title>壁纸地区</template>
          <template #description>选择获取哪个地区的壁纸推荐。每个地区每日的推荐将会有不同的结果。设置完成后在下载加载时生效。</template>
          <template #action>
            <option-selector @onSelectionChange="triggerSetRegion" :initial-value="settingsInfo.resolution" :options="settingsInfo.options.regionOptions" title="选择地区" description="不同的地区每日将会有不同的推荐，您也可以选择随机来获取不同地区的推荐。"/>
          </template>
        </normal-item-box>
      </template>
      <template v-if="wallpaperInfoDialogTab === 'offlinePreference'">
        <h2>自定义壁纸</h2>
        <div style="margin-bottom: 15px">自定义壁纸选项</div>
        <normal-item-box>
          <template #title>启用“必应每日壁纸”</template>
          <template #description>启用后，我们将会随机切换背景图片</template>
          <template #action>
            <a-switch @change="triggerEnableOnlineWallpaper()" v-model:checked="isEnableDailyImage"/>
          </template>
        </normal-item-box>
        <normal-item-box v-if="!isEnableDailyImage">
          <template #title>切换壁纸</template>
          <template #description>上传你喜欢的图片作为壁纸。</template>
          <template #action>
            <UButton>切换壁纸</UButton>
          </template>
        </normal-item-box>
      </template>
    </template>
  </divide-box>
</template>

<style scoped>

</style>