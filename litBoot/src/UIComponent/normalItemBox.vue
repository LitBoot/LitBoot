<script setup>

</script>

<template>
<div class="normalItemBoxContainer">
  <div class="ntbWords">
    <div class="ntbTitle">
      <slot name="title"></slot>
    </div>
    <div class="ntbDescription">
      <slot name="description"></slot>
    </div>
  </div>
  <div class="ntbActions">
    <slot name="action">

    </slot>
  </div>
</div>
</template>

<style scoped>
.normalItemBoxContainer {
  margin-top: 5px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  width: auto;
  height: fit-content;
  justify-content: space-between;
  cursor: pointer;
  color: white;
  transition: all 0.1s;
  border-radius: 7px;
  align-items: center;
}
.normalItemBoxContainer:hover {
  background-color: rgba(255,255,255,0.15);
}
.ntbWords {
  display: flex;
  flex-direction: column;
  flex: auto;
}
.ntbTitle {
  font-weight: bold;
  margin-bottom: 7px;
}
.ntbDescription {
  color: rgb(160, 160, 160);
  font-size: small;
}
.ntbActions {
  display: flex;
  flex-direction: row;
}
</style>