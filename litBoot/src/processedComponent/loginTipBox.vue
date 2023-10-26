<script setup>
import UButton from "../UIComponent/UButton.vue";
import {isLoggedIn} from "../js/Services/User.js"
import {ref} from "vue";

const pageID = ref({
  loginOptionSelector: "opSelector",
  loginPage: "login",
  registerPage: "register"
})
const currentPage = ref(pageID.value.loginOptionSelector)
</script>

<template>
  <div class="loginTipBoxContainer">
    <a-avatar :size="64" style="margin-right: 7px"></a-avatar>
    <div class="verticalContainer">
      <template v-if="isLoggedIn() === false">
        <template v-if="currentPage === pageID.loginOptionSelector">
          <h2 style="margin-left: 5px">登录或注册</h2>
          <div class="descriptionTextArea">登录后即可使用全部功能，包括小组件，收藏夹等</div>
          <div class="horizontalControl">
            <UButton type="primary" @click="currentPage = pageID.loginPage">登录</UButton>
            <UButton>注册</UButton>
          </div>
        </template>
        <template v-if="currentPage === pageID.loginPage">
          <h2 style="margin-left: 5px">登录</h2>
          <div class="descriptionTextArea">如果没有账号，请先注册账号，然后继续</div>

        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>
.loginTipBoxContainer {
  margin-top: 5px;
  padding: 15px;
  display: flex;
  flex-direction: row;
  width: auto;
  height: fit-content;
  cursor: pointer;
  color: white;
  transition: all 0.1s;
  border-radius: 7px;
  align-items: center;
  background-color: rgba(129, 128, 128, 0.15);
}
.verticalContainer {
  display: flex;
  flex-direction: column;
}
.horizontalControl {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}
.descriptionTextArea {
  color: gray;
  font-size: small;
  margin-left: 5px;
}
</style>