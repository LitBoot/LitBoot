<script setup>
const props = defineProps(["selectedStatus"])
</script>

<template>
<div class="optionSelectorItemContainer" :id="props.selectedStatus">
  <slot></slot>
</div>
</template>

<style scoped>
.optionSelectorItemContainer {
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  padding: 15px;
  border-radius: 5px;
  color: white;
  width: auto;
  height: fit-content;
  transition: all, 0.1s;
  border-color: #606060;
  border-width: 1px;
  border-style: solid;
}
#false:hover {
  background-color: rgba(255,255,255,0.25);
}
#false:active {
  background-color: rgba(255, 255, 255, 0.15);
}
#true:hover {
  background-color: dodgerblue;
}
#true:active {
  background-color: #10467a;
}
</style>