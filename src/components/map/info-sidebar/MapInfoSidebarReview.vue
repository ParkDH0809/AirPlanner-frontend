<script setup>
import MapInfoSidebarReviewItem from '@/components/map/info-sidebar/MapInfoSidebarReviewItem.vue';
import StarRating from 'vue-star-rating';
import { ref, watch } from 'vue';
import { createReview, getReview } from '@/api/map.js';
import { useUserStore } from '@/stores/user';

// session
const useStore = useUserStore();

// defineProps
const props = defineProps(['attraction']);

// defineEmits
const emit = defineEmits(['review-count']);

// add review
const reviewText = ref();
const attractionScore = ref(0);
const userId = ref(useStore.userInfo.userId);
const reviewData = ref({
  userId: userId,
  reviewText: reviewText,
  attractionScore: attractionScore,
  contentId: props.attraction.contentId,
});

function addReview() {
  reviewData.value.contentId = props.attraction.contentId;
  createReview(reviewData.value, () => (getReviews()), (error) => console.log(error));
  reviewText.value = "";
}

// get review
const attractionReviews = ref([]);
const reviewCount = ref(0);
function getReviews() {
  getReview(
    props.attraction.contentId,
    ({ data }) => {
      attractionReviews.value = '';
      attractionReviews.value = data;
      reviewCount.value = data.length;
      emit("review-count", reviewCount);
    },
    (error) => {
      console.log(error);
    }
  );
}

// watch
watch(props,
  () => {
    if (props.attraction.contentId != null) {
      getReviews();
    }
  },
  { immediate: true }
);
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />
  <div clas="w-full">
    <div class="flex flex-col items-center">
      <!-- review items start -->
      <div class="h-32 pt-10" v-if="attractionReviews.length == 0">현재 리뷰가 없습니다</div>
      <MapInfoSidebarReviewItem v-for="review in attractionReviews" :key="review" :review="review" />
    </div>
    <!-- review items end -->
    <!-- input TextArea start -->
    <div class="flex flex-col bg-white shadow-lg min-w-1xl rounded-xl">
      <div class="flex flex-col items-center w-full bg-gray-200">
        <div class="flex flex-col items-center py-6 space-y-3">
          <star-rating v-model:rating="attractionScore" :show-rating="false" :star-size="30" clearable></star-rating>
        </div>
        <div class="flex flex-col w-3/4">
          <textarea placeholder="리뷰를 남겨주세요!!" v-model="reviewText" rows="3"
            class="p-4 text-gray-500 resize-none rounded-xl"></textarea>
          <button @click="addReview"
            class="py-3 my-8 text-lg text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
            등록하기
          </button>
        </div>
      </div>
    </div>
    <!-- input TextArea end -->
  </div>
</template>

<style scoped></style>
