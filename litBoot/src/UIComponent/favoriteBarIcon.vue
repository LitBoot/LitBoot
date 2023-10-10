<script setup>
import Icons from "../assets/vueIcon/icons.vue";
import {computed, ref} from "vue";
const props = defineProps(['favoriteName', 'url', 'icon', 'iconHeight'])

const displayBuiltinIcons = ref(true)

const iconLocation = computed(()=>{
  if (props.icon === "google") {
    displayBuiltinIcons.value = true
  }
  else {
    displayBuiltinIcons.value = false
  }
})
</script>

<template>
  <a-dropdown :trigger="['contextmenu']">
    <a-tooltip>
      <template #title>{{props.favoriteName}}</template>
      <div class="container" tabindex="1">
        <img :src="props.url" :height="iconHeight" v-if="!displayBuiltinIcons"/>
        <template v-if="displayBuiltinIcons">
          <Icons :name="icon" :size="props.iconHeight"/>
        </template>
      </div>
    </a-tooltip>
    <template #overlay>
      <a-menu>
        <a-menu-item key="1">编辑此收藏</a-menu-item>
        <a-menu-item key="2">从快捷收藏栏中删除</a-menu-item>
        <a-menu-item key="3">在新的内建窗口中打开此网站</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped>
.container {
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.1s;
}
.container:hover {
  background-color: #e0e0e0;
}
.container:active {
  background-color: #b9b9b9;
}
</style>