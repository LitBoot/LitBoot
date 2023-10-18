<script setup>

</script>

<template>
<div class="uButtonContainer" tabindex="1">
  <slot></slot>
</div>
</template>

<style scoped>
.uButtonContainer {
  margin: 5px;
  padding: 7px;
  width: fit-content;
  background-color: rgba(255,255,255,0);
  color: white;
  cursor: pointer;
  border-radius: 7px;
  transition: all 0.1s;
  font-size: small;
  border-width: 1px;
  border-color: white;
  border-style: solid;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}
.uButtonContainer:hover {
  background-color: rgba(255,255,255,0.2);
}
.uButtonContainer:active {
  background-color: rgba(255,255,255,0.1);
}
</style>