<script setup>
import {computed} from "vue";

const props = defineProps(["type"])
const currentBtnType = computed(()=>{
  if (props.type === undefined || props.type === null) {
    return "normal"
  }
  else {
    return props.type
  }
})
</script>

<template>
<div class="uButtonContainer" :id="currentBtnType" tabindex="1">
  <slot></slot>
</div>
</template>

<style scoped>
.uButtonContainer {
  margin: 5px;
  padding: 7px;
  width: fit-content;
  cursor: pointer;
  border-radius: 7px;
  transition: all 0.1s;
  font-size: small;
  border-width: 1px;
  border-style: solid;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}
#normal {
  background-color: rgba(255,255,255,0);
  color: white;
  border-color: white;
}
#normal:hover {
  background-color: rgba(255,255,255,0.2);
}
#normal:active {
  background-color: rgba(255,255,255,0.1);
}
#primary {
  background-color: dodgerblue;
  color: white;
  border-color: #104981;
}
#primary:hover {
  background-color: #1776d2;
}
#primary:active {
  background-color: #135596;
}
</style>