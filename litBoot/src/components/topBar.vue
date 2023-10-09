<script setup>
import {SettingFilled} from '@ant-design/icons-vue'

const emit = defineEmits(['triggerFocusStatus'])
let focusStatus = false;

function triggerOnFocus() {
  focusStatus = !focusStatus
  emit('triggerFocusStatus', focusStatus)
  console.log("Focus mode triggered!")
}
</script>

<template>
<div class="topBarContainer">
  <div class="roundButton">
    <SettingFilled/>
  </div>
  <div class="roundButton" @click="triggerOnFocus">
    <img src="../assets/Focus.svg" width="25"/>
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