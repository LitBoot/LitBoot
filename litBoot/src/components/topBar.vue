<script setup>
import {SettingFilled, CopyrightCircleOutlined} from '@ant-design/icons-vue'
import {ref} from "vue";

const emit = defineEmits(['triggerFocusStatus', 'triggerWallpaperDialog', 'triggerSettingsDialog'])
const focusStatus = ref(false)

function triggerOnFocus() {
  focusStatus.value = !focusStatus.value
  emit('triggerFocusStatus', focusStatus.value)
  console.log("Focus mode triggered!")
}

function triggerOnOpenSettings() {
  emit("triggerSettingsDialog")
}

function triggerOpenWallpaperDialog() {
  emit('triggerWallpaperDialog')
}
</script>

<template>
<div class="topBarContainer">
  <div class="roundButton" v-if="!focusStatus" @click="triggerOnOpenSettings">
    <SettingFilled/>
  </div>
  <div class="roundButton" @click="triggerOnFocus">
    <img src="../assets/Focus.svg" width="25"/>
  </div>
  <div class="roundButton" @click="triggerOpenWallpaperDialog" v-if="!focusStatus">
    <CopyrightCircleOutlined/>
  </div>
</div>
</template>

<style scoped>
.topBarContainer {
  position: absolute;
  top: 7px;
  left: 7px;
  width: fit-content;
  height: fit-content;
  z-index: 2000;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.roundButton {
  margin: 5px;
  padding: 7px;
  border-radius: 20px;
  color: white;
  transition: all 0.1s;
  font-size: 20px;
  cursor: pointer;
}
.roundButton:hover {
  background-color: rgba(30, 29, 29, 0.5);
  backdrop-filter: blur(10px);
}
.inline-item {
  margin-right: 5px;
}
</style>