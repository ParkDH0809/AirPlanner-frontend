<script setup>
import plannerBg_01 from "@/assets/planner-bg-1.png";
import StarRating from "vue-star-rating";
defineProps(["attraction"]);
</script>

<template>
  <div
    class="flex-col items-center cursor-pointer hover:scale-105"
    @click="
      $router.push({
        name: 'attractionDetail',
        state: {
          attraction: {
            contentId: attraction.contentId,
            contentTypeId: attraction.contentTypeId,
            title: attraction.title,
            addr1: attraction.addr1,
            firstImage: attraction.firstImage,
            firstImage2: attraction.firstImage2,
          },
        },
      })
    "
  >
    <img v-if="attraction.firstImage != ''" :src="attraction.firstImage" alt="" class="mb-4 rounded-lg w-52 h-52" />
    <img v-else :src="plannerBg_01" alt="" class="mb-4 rounded-lg w-52 h-52" />
    <p class="font-semibold text-center">{{ attraction.title }}</p>
    <div class="text-center">
      <star-rating
        :rating="attraction.scoreAvg"
        :read-only="true"
        :star-size="15"
        :show-rating="false"
        :inline="true"
        :increment="0.1"
      ></star-rating>
    </div>
  </div>
</template>

<style scoped></style>
