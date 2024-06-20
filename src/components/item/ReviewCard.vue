<script setup>
import StarRating from "vue-star-rating";

defineProps(['review'])
defineEmits(['deleteReview'])
</script>

<template>
  <div class="flex justify-between w-full bg-gray-100 m-2 px-6 py-2">
    <div class="">
      <div class="text-md font-bold">{{ review.attractionTitle }}</div>
      <star-rating :rating="review.attractionScore" :read-only=true :star-size="15" :show-rating=false
        :inline=true></star-rating>

      <div class="text-sm"> {{ review.reviewModifyAt }}</div>
      <div class="mt-2">{{ review.reviewText }}</div>
    </div>
    <div class="cursor-pointer" @click="$emit('deleteReview', review.reviewId)">
      Delete
    </div>
  </div>
</template>

<style scoped></style>