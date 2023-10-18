<script setup>
import UButton from "../UButton.vue";
import {ref} from "vue";
import {RightOutlined} from "@ant-design/icons-vue"
import OptionSelectorItem from "./optionSelectorItem.vue";

const showSelectionPanel = ref(false)
const props = defineProps(["options", "title", "description", "initialValue"])
const emits = defineEmits(["onClose", "onSelectionChange"])

const explicitSelectedName = ref("选择一个值")
const currentSelectedValue = ref("__unified__NotSelected")

function handleOnSelect(targetName, targetValue) {
  emits("onSelectionChange", targetValue)
  showSelectionPanel.value = false
  explicitSelectedName.value = targetName
  emits("onClose")
}

function applyDefaultValue() {
  console.log("Processing Initial Value")
  console.log(props.initialValue)
  for (let i = 0; i < props.options.length; i++) {
    if (props.options[i].key === props.initialValue) {
      // apply the initial value
      currentSelectedValue.value = props.options[i].value
      explicitSelectedName.value = props.options[i].key
    }
  }
}

applyDefaultValue()

</script>

<template>
  <UButton @click="showSelectionPanel = true">
    {{ explicitSelectedName }}
    <RightOutlined/>
  </UButton>
  <div class="optionSelectorWindowContainer" v-if="showSelectionPanel">
    <div class="optionPanel">
      <h2>{{props.title}}</h2>
      <div style="margin-bottom: 15px">{{props.description}}</div>
      <template v-for="item in props.options">
        <option-selector-item @click="handleOnSelect(item.key, item.value)" :selected-status="item.key === currentSelectedValue">{{item.key}}</option-selector-item>
      </template>
      <UButton @click="showSelectionPanel = false">关闭</UButton>
    </div>
  </div>
</template>

<style scoped>
.optionSelectorWindowContainer {
  z-index: 3500;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.65);
}
.optionPanel {
  display: flex;
  flex-direction: column;
  width: 35%;
  height: fit-content;
  padding: 20px;
  border-radius: 7px;
  background-color: rgb(33, 32, 32);
  color: white;
}
</style>