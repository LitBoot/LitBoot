<script setup>

</script>

<template>
<div class="dockContainer">
  <div class="dockContentContainer">
    This is the dock bar
  </div>
</div>
</template>

<style scoped>
.dockContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
  flex: 1;
}
.dockContentContainer {
  margin: 5px;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.65);
  padding: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>