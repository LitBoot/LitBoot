<script setup>

</script>

<template>
<div class="staticListContentBox">
  <slot>

  </slot>
</div>
</template>

<style scoped>
.staticListContentBox {
  margin: 5px;
  padding: 10px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  width: auto;
  height: fit-content;
  transition: all 0.1s;
  color: white;
  justify-content: left;
}
.staticListContentBox:hover {
  background-color: rgb(255,255,255,0.1);
}
</style>