<script setup>
import StarRating from "vue-star-rating";
defineProps({
  review: Object,
});
</script>

<template>
  <div class="flex justify-between w-full px-4 border-b-2">
    <div class="">
      <div class="mt-2 font-bold text-md">{{ review.userId }}</div>

      <div class="mt-2 text-sm">
        <star-rating :rating="review.attractionScore" :read-only="true" :star-size="15" :show-rating="false"
          :inline="true"></star-rating>
        | {{ review.reviewModifyAt.substr(0, 10) }}
      </div>
      <div class="mt-2 mb-4 text-md">{{ review.reviewText }}</div>
    </div>
  </div>
</template>

<style scoped></style>
