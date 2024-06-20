<script setup>
import MyInfo from "@/components/mypage/MyInfo.vue";
import MyPlanner from "@/components/mypage/MyPlanner.vue";
import MyReview from "@/components/mypage/MyReview.vue";

defineProps({
  category: String,
})

</script>

<template>
  <div class="flex items-center w-full dashboard-wrapper">
    <div class="rounded-lg h-full py-3 ml-auto mr-auto w-full">
      <div class="mostly-customized-scrollbar h-full">
        <div v-if="category == 'myInfo'">
          <MyInfo></MyInfo>
        </div>
        <div v-else-if="category == 'myPlanner'">
          <MyPlanner></MyPlanner>
        </div>
        <div v-else="category == 'myReview'">
          <MyReview></MyReview>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mostly-customized-scrollbar {
  overflow-y: auto;
}

/* Demonstrate a "mostly customized" scrollbar
 * (won't be visible otherwise if width/height is specified) */
.mostly-customized-scrollbar::-webkit-scrollbar {
  width: 8px;
  background-color: #FFF;
  /* or add it to the track */
}

/* Add a thumb */
.mostly-customized-scrollbar::-webkit-scrollbar-thumb {
  background: #2E3A65;
}
</style>