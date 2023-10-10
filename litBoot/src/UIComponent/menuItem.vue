<script setup>

</script>

<template>
<div class="menuItemContainer" tabindex="1">
  <slot></slot>
</div>
</template>

<style scoped>
.menuItemContainer {
  margin-bottom: 5px;
  padding: 7px;
  border-radius: 5px;
  color: white;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  width: auto;
  height: fit-content;
  transition: all 0.1s;
}
.menuItemContainer:hover {
  background-color: dodgerblue;
}
.menuItemContainer:active {
  background-color: #0f4d88;
}
</style>