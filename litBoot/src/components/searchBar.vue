<script setup>
import {SearchOutlined, CloseCircleFilled} from '@ant-design/icons-vue'
import {ref, computed} from "vue";
import {returnGooglePattern, returnBaiduPattern, returnBingPattern} from '../js/searchEngine.js'

const searchBarContent = ref("")
const isShowResultList = ref(false)
const isShowQuickCalculate = computed(()=>{
  return searchBarContent.value.includes("计算")
})
const calculateResult = ref("")
const emit = defineEmits(['onSearch', 'onEndSearch'])

// smart engine support function
// patterns
const calculationPattern = new RegExp(/(\-|\+)?\d+(\.\d+)?[\+|\-|\*|\/](\-|\+)?\d+(\.\d+)?/g)
const calculateSymbols = ["+", "-", "*", "/"]
function smartSearch(content) {
  // Quick Calculation
  if (calculationPattern.exec(content).length >= 0) {
    // means the target input fulfilled the calculation requirement, extract the numbers
    let strNum1 = "", strNum2 = "", symbol="", isInputNum1 = true, result = calculationPattern.exec(content)
    for (let i = 0; i < result[0].length; i++) {
      if (isInputNum1) {
        if (calculateSymbols.indexOf(result[0][i]) !== -1 && strNum1.length !== 0) {
          // means calculation symbol was included, separate the two numbers
          isInputNum1 = false
          symbol = result[0][i]
        }
        else {
          // append
          strNum1 += result[0][i]
        }
      }
      else {
        // append to the second num
        strNum2 += result[0][i]
      }
    }
    // convert and do the calculation
    if (symbol === "+") {
      calculateResult.value = String(Number(strNum1) + Number(strNum2))
    }
    else if (symbol === "-") {
      calculateResult.value = String(Number(strNum1) - Number(strNum2))
    }
    else if (symbol === "*") {
      calculateResult.value = String(Number(strNum1) * Number(strNum2))
    }
    else if (symbol === "/") {
      if (true) {}
    }
    else {
      calculateResult.value = "未知的运算方法"
    }
  }
}

function openURL(url) {
  window.location.href = url
}

function triggerOnSearch() {
  isShowResultList.value = true;
  emit('onSearch')
}

function triggerOnEndSearch() {
  emit('onEndSearch')
}

</script>

<template>
<div class="searchbarContainer">
  <div class="searchbarContentContainer" tabindex="1">
    <div class="searchbarInputHolder">
      <SearchOutlined style="flex: 1"/>
      <input type="text" class="searchbarInput" placeholder="搜索任何东西" v-model="searchBarContent"
             @focus="triggerOnSearch"
             @blur="triggerOnEndSearch"
      />
      <CloseCircleFilled @click="searchBarContent = ''"/>
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