<script setup>
import ReviewCard from '@/components/item/ReviewCard.vue';
import { useUserStore } from '@/stores/user';
import { selectAttraction, getReviews, deleteReview, getReviewByUserId } from '@/api/map.js';
import { ref, onMounted } from 'vue';

// session
const useStore = useUserStore();

// get reviews
const reviews = ref([]);
function getMyReviews() {
  reviews.value.length = 0;
  if (useStore.userInfo.userRole == 1) {
    getReviews(({ data }) => {
      initReviewData(data)
    },
    (error) => {
      console.log(error);
    })
  } else {
    getReviewByUserId(
    useStore.userInfo.userId,
    ({ data }) => {
      initReviewData(data)
    },
    (error) => {
      console.log(error);
    }
  );
  }
};

function initReviewData(data) {
  data.forEach(element => {
        reviews.value.push({
          contentId: element.contentId,
          attractionTitle: getAttractionTitle(element.contentId),
          userId: element.userId,
          reviewId: element.reviewId,
          reviewText: element.reviewText,
          attractionScore: element.attractionScore,
          reviewCreatedAt: element.reviewCreateAt.substr(0, 10) + " " + element.reviewCreateAt.substr(11, 8),
          reviewModifyAt: element.reviewModifyAt.substr(0, 10) + " " + element.reviewModifyAt.substr(11, 8),
        })
      });
}

// getAttractionName
function getAttractionTitle(contentId) {
  const title = ref('');
  selectAttraction(contentId, ({ data }) => {
    title.value = data.title;
  }
    , (error) => {
      console.log(error);
    })
  return title;
}

// delete review
const deleteMyReview = (reviewId) => {
  if (confirm("리뷰를 삭제하시겠습니까?")) {
    deleteReview(reviewId, () => { getMyReviews() }, (error) => { console.log(error); })
  }
}

// mounted
onMounted(() => {
  getMyReviews();
});
</script>

<template>
  <div class="relative flex flex-wrap overflow-auto h-full">
    <ReviewCard v-for="review in reviews" :key="review.reviewId" :review="review" @deleteReview="deleteMyReview" />
  </div>
</template>

<style scoped></style>