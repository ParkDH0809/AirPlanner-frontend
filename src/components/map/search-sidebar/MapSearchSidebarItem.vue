<script setup>
import plannerBg_01 from "@/assets/planner-bg-1.png";

// defineProps
defineProps({
  result: Object,
});

// defindEmits
const emit = defineEmits(["attraction-info"]);
function attractionInfo(attraction) {
  emit("attraction-info", attraction);
}
</script>

<template>
  <div class="flex justify-center w-full m-1 cursor-pointer" @click="attractionInfo(result)">
    <div class="flex items-start w-full p-2 border-b-2">
      <img v-if="result.firstImage2 != ''" :src="result.firstImage2" class="w-28 h-28" />
      <img v-else :src="plannerBg_01" class="w-28 h-28" />
      <div class="ml-2 w-full">
        <div class="mb-1 text-left search-title">{{ result.title }}</div>
        <div class="text-sm text-left">{{ result.tel }}</div>
        <div class="text-xs text-left">{{ result.addr1 }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-title {
  font-size: 1.1rem;
  line-height: 1.5rem;
}
</style>
