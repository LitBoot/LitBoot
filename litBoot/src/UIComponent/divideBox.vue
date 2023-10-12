<script setup>
import {CloseOutlined} from "@ant-design/icons-vue"

const emit = defineEmits(['onClose'])

function handleOnClose() {
  emit('onClose')
}
</script>

<template>
<div class="divideBoxContainer">
  <div class="sideMenuContainer">
    <div class="closeBtnContainer" tabindex="2" @click="handleOnClose">
      <CloseOutlined/>
    </div>
    <div class="divideBoxTitle">
      <slot name="title">

      </slot>
    </div>
    <slot name="menu">

    </slot>
  </div>
  <div class="mainContentContainer">
    <slot name="content">

    </slot>
  </div>
</div>
</template>

<style scoped>
.closeBtnContainer {
  display: flex;
  flex-direction: row;
  background-color: rgba(31, 30, 30, 0.5);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.1s;
  border-radius: 20px;
  color: white;
  padding: 10px;
  width: fit-content;
  height: fit-content;
}
.closeBtnContainer:active {
  background-color: dodgerblue;
}
.divideBoxContainer {
  z-index: 3000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.35);
}
.sideMenuContainer {
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 15%;
  height: 60%;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  background-color: rgba(31, 30, 30, 0.5);
  backdrop-filter: blur(10px);
  color: white;
}
.mainContentContainer {
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 40%;
  height: 60%;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  background-color: rgb(31,30,30);
  color: white;
  overflow-y: scroll;
}
.mainContentContainer::-webkit-scrollbar {
  display: none;
}
.divideBoxTitle {
  color: white;
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>