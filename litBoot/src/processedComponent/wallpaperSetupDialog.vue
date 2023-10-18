<script setup>
import MenuItem from "../UIComponent/menuItem.vue";
import DivideBox from "../UIComponent/divideBox.vue";
import NormalItemBox from "../UIComponent/normalItemBox.vue";
import {ref} from "vue";
import {supportedResolutions, getWallpaperRequestsInfo, defaultValues} from "../js/requests/wallpaper.js"
import UButton from "../UIComponent/UButton.vue";
import OptionSelector from "../UIComponent/optionController/optionSelector.vue";

const emits = defineEmits(['onDialogClose'])
const props = defineProps(['wallpaperInfo'])
const wallpaperInfoDialogTab = ref("info")
const settingsInfo = ref({
  resolution: "",
  region: "",
  options: {
    resolutionOptions: [
      {
        value: "低",
        key: supportedResolutions.Fast
      },
      {
        value: "中",
        key: supportedResolutions.Normal
      },
      {
        value: "高",
        key: supportedResolutions.FourK
      }
    ]
  },
})
getWallpaperRequestsInfo(defaultValues.resolutionKeyName).then((res)=>{
  settingsInfo.value.resolution = res
})
getWallpaperRequestsInfo(defaultValues.regionKeyName).then((res)=>{
  settingsInfo.value.region = res
})

function triggerOnDialogClose() {
  emits('onDialogClose')
}
</script>

<template>
  <divide-box @onClose="triggerOnDialogClose">
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
            <option-selector :initial-value="settingsInfo.resolution" :options="settingsInfo.options.resolutionOptions" title="选择分辨率" description="选择一个合适的分辨率。越高的分辨率加载速度越慢，反之亦然。"/>
          </template>
        </normal-item-box>
      </template>
      <template v-if="wallpaperInfoDialogTab === 'offlinePreference'">
        <h2>自定义壁纸</h2>
      </template>
    </template>
  </divide-box>
</template>

<style scoped>

</style>