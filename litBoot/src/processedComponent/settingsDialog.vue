<script setup>

import DivideBox from "../UIComponent/divideBox.vue";
import MenuItem from "../UIComponent/menuItem.vue";
import {ref} from "vue";
import LoginTipBox from "./loginTipBox.vue";

const emits = defineEmits(['onDialogClose'])
const tabKeyName = ref({
  account: "account"
})
const currentTabName = ref(tabKeyName.value.account)

function triggerOnClose() {
  emits("onDialogClose")
}

</script>

<template>
<divide-box @onClose="triggerOnClose">
  <template #title>设置</template>
  <template #menu>
    <menu-item>账号</menu-item>
  </template>
  <template #content>
    <template v-if="currentTabName === tabKeyName.account">
      <h2>账号</h2>
      <div style="margin-bottom: 15px">登录，注册，管理账号</div>
      <login-tip-box></login-tip-box>
    </template>
  </template>
</divide-box>
</template>

<style scoped>

</style>