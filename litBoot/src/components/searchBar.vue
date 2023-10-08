<script setup>
import {SearchOutlined} from '@ant-design/icons-vue'
import {ref, computed} from "vue";
import {returnGooglePattern, returnBaiduPattern, returnBingPattern} from '../js/searchEngine.js'

const searchBarContent = ref("")
const isShowResultList = computed(()=>{
  return searchBarContent.value.length !== 0;
})
const isShowQuickCalculate = computed(()=>{
  return searchBarContent.value.includes("计算")
})

function openURL(url) {
  window.location.href = url
}

</script>

<template>
<div class="searchbarContainer">
  <div class="searchbarContentContainer" tabindex="1">
    <div class="searchbarInputHolder">
      <SearchOutlined style="flex: 1"/>
      <input type="text" class="searchbarInput" placeholder="搜索任何东西" v-model="searchBarContent"/>
    </div>
    <div class="searchbarResultListHolder" v-if="isShowResultList">
      <div class="resultListItem" v-if="isShowQuickCalculate">计算结果：</div>
      <div class="resultListItem" @click="openURL(returnBaiduPattern(searchBarContent))">
        <div class="iconContainer"><img src="../assets/baiduIcon.svg"></div>
        用 百度 搜索 {{searchBarContent}}
      </div>
      <div class="resultListItem" @click="openURL(returnGooglePattern(searchBarContent))">
        <div class="iconContainer"><img src="../assets/googleIcon.svg"></div>
        用 谷歌 搜索 {{searchBarContent}}</div>
      <div class="resultListItem" @click="openURL(returnBingPattern(searchBarContent))">
        <div class="iconContainer"><img src="../assets/bingIcon.svg"></div>
        用 必应 搜索 {{searchBarContent}}</div>
    </div>
  </div>
</div>
</template>

<style scoped>
.searchbarContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
}
.searchbarContentContainer {
  width: fit-content;
  padding: 15px;
  background-color: rgba(30, 29, 29, 0.5);
  backdrop-filter: blur(10px);
  color: white;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  transition: all 0.1s;
}
.searchbarInputHolder {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
.searchbarResultListHolder {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  justify-content: center;
  height: fit-content;
  width: 100%;
}
.searchbarInput {
  outline: none;
  border: 0px;
  background-color: rgba(0,0,0,0);
  color: white;
  font-size: 20px;
  height: auto;
  width: 50vh;
  flex: 9;
  transition: all 0.1s;
}
.searchbarInput:focus {
  width: 75vh;
}
.resultListItem {
  margin: 5px;
  padding: 7px;
  border-radius: 5px;
  width: 100%;
  height: fit-content;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  transition: all 0.1s;
}
.resultListItem:hover {
  background-color: dodgerblue;
}
.iconContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  margin-right: 5px;
}
</style>