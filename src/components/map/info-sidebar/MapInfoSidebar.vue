<script setup>
import { ref } from "vue";
import MapInfoSidebarReview from "@/components/map/info-sidebar/MapInfoSidebarReview.vue";

defineProps({
  attraction: Object,
});

const isOpened = ref(true);
const isReview = ref(true);
const typeName = {
  12: "관광지",
  14: "문화시설",
  15: "축제공연행사",
  25: "여행코스",
  28: "레포츠",
  32: "숙박",
  38: "쇼핑",
  39: "음식점",
};
const reviewCount = ref(0);
const setReviewCount = (r) => {
  reviewCount.value = r;
};
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />
  <div>
    <div class="absolute z-10 flex flex-row-reverse" style="height: 85.5vh">
      <!--Drawer -->
      <button @click="isOpened = !isOpened"
        class="w-6 h-48 p-1 my-auto text-center duration-300 bg-main-color focus:outline-none hover:bg-gray-500 transition-color"
        style="border-top-right-radius: 3rem; border-bottom-right-radius: 3rem">
        <div v-if="isOpened">
          <span><i class="text-white fas fa-arrow-left"></i></span>
        </div>
        <div v-else>
          <span><i class="text-white fas fa-arrow-right"></i></span>
        </div>
      </button>

      <!-- Sidebar Content -->
      <div ref="content"
        class="w-full transition-all duration-700 bg-white overflow-x-hidden mostly-customized-scrollbar shadow-[2px_8px_5px_0px] shadow-main-color"
        :class="[isOpened ? 'max-w-lg' : 'max-w-0']">
        <div class="flex flex-col w-80">
          <div class="mb-6">
            <img v-if="attraction.firstImage == ''"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png" />
            <img v-else :src="attraction.firstImage" />
          </div>
          <p class="mb-2 ml-2 text-gray-500">{{ typeName[attraction.contentTypeId] }}</p>
          <p @click="
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
            " class="mb-8 ml-2 text-2xl font-bold border-b-2 border-black cursor-pointer w-fit">
            {{ attraction.title }}
          </p>
          <p class="mb-8 ml-2">{{ attraction.addr1 }}</p>
          <div v-if="attraction.title != null" class="flex items-center ml-48">
            <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
              </path>
            </svg>
            <p class="ml-1 text-sm font-bold text-gray-900">{{ attraction.scoreAvg }}</p>
            <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
            <a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underlin"
              @click="isReview = !isReview">{{ reviewCount }} reviews</a>
          </div>
          <div class="w-full mb-2 border-b-2"></div>
          <div class="w-full" v-show="isReview" v-if="attraction.contentId != null">
            <MapInfoSidebarReview @review-count="setReviewCount" :attraction="attraction"></MapInfoSidebarReview>
          </div>
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
  height: 8px;
  background-color: #fff;
  /* or add it to the track */
}

/* Add a thumb */
.mostly-customized-scrollbar::-webkit-scrollbar-thumb {
  background: #2e3a65;
}
</style>
