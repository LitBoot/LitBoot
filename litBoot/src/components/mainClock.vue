<script setup>
import {ref} from "vue";

const hour = ref("9")
const minute = ref("27")
const year = ref(1970)
const month = ref(1)
const day = ref(1)
const weekday = ref("")
const props = defineProps(['onFocusMode'])
const isOnFocusMode = ref(props.onFocusMode)

setInterval(getCurrentTime, 500)

let weekArray = ["日", "一", "二", "三", "四", "五", "六"]
function getCurrentTime() {
  let timeObject = new Date()
  let targetDay = timeObject.getDay()
  console.log("Updating time...")
  // process date
  year.value = timeObject.getFullYear()
  month.value = timeObject.getMonth()
  day.value = timeObject.getDate()

  // process day
  let originalHour = timeObject.getHours()
  if (originalHour < 10) {
    hour.value = "0" + originalHour
  }
  else {
    hour.value = originalHour.toString()
  }

  let originalMinute = timeObject.getMinutes()
  if (originalMinute < 10) {
    minute.value = "0" + originalMinute
  }
  else {
    minute.value = originalMinute.toString()
  }

  weekday.value = weekArray[targetDay]
}

getCurrentTime()
</script>

<template>
<div class="clockContainer">
  <div class="main-time-display">{{hour}}:{{minute}}</div>
  <div class="main-date-display">{{year}}年{{month}}月{{day}}日 星期{{weekday}}</div>
  <div v-if="props.onFocusMode">您当前处于专注模式！</div>
</div>
</template>

<style scoped>
.clockContainer {
  margin: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 3;
}
.main-time-display {
  font-size: 60px;
  font-weight: bold;
  margin: 5px;
}
.main-date-display {
  font-size: 20px;
  font-weight: normal;
  margin: 5px;
}
:deep(.slick-slide) {
  z-index: 2000;
}
</style>