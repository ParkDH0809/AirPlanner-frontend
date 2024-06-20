<script setup>
import { onBeforeMount, ref } from "vue";
import { getAttractionInfo, getAttractionCommonInfo } from "@/api/attraction.js";
const { attraction } = history.state;
const attractionIntro = ref();
const attractionCommon = ref();
onBeforeMount(() => {
  getAttractionCommonInfo(
    `?MobileOS=ETC&MobileApp=airplanner&_type=json&contentId=${attraction.contentId}&defaultYN=Y&overviewYN=Y&serviceKey=${serviceKey}`,
    (response) => {
      console.log(response.data.response.body.items.item[0]);
      attractionCommon.value = response.data.response.body.items.item[0];
    },
    (error) => console.log(error)
  );
  getAttractionInfo(
    `?MobileOS=ETC&MobileApp=airplanner&_type=json&contentId=${attraction.contentId}&contentTypeId=${attraction.contentTypeId}&serviceKey=${serviceKey}`,
    (response) => {
      console.log(response.data.response.body.items.item[0]);
      attractionIntro.value = response.data.response.body.items.item[0];
    },
    (error) => console.log(error)
  );
});
</script>

<template>
  <div class="flex-col w-2/5 m-auto mt-10">
    <h1 class="mb-10 text-4xl font-extrabold text-center">{{ attraction.title }}</h1>
    <h3 class="mb-12 text-center">{{ attraction.addr1 }}</h3>
    <img :src="attraction.firstImage" alt="로딩중" loading="lazy" class="m-auto mb-20" />
    <h2 class="mb-3 text-3xl font-extrabold">상세정보</h2>
    <hr class="mb-10 border-b-4" />
    <div v-html="attractionCommon.overview" class="mb-20 leading-9"></div>

    <p>홈페이지 : <span v-html="attractionCommon.homepage"></span></p>
    <div>
      문의 및 안내
      <div v-html="attractionIntro.infocenter"></div>
    </div>
    <p>휴무일 : {{ attractionIntro.restdate }}</p>
    <div>
      이용시간
      <div v-html="attractionIntro.usetime"></div>
    </div>
    <div>주차 : <span v-html="attractionIntro.parking"></span></div>
    <div class="mb-16">
      체험 요소
      <div v-html="attractionIntro.expguide"></div>
    </div>
  </div>
</template>

<style scoped></style>
