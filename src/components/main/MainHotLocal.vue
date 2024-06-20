<script setup>
import MainHotLocalAttractionItem from "@/components/main/MainHotLocalAttractionItem.vue";
import MainHotLocalButton from "@/components/main/MainHotLocalButton.vue";
import { getHotLocal } from "@/api/map.js";
import { onBeforeMount, ref, watch } from "vue";

const localNumber = [
  { value: 0, name: "전국" },
  { value: 1, name: "서울" },
  { value: 2, name: "인천" },
  { value: 3, name: "대전" },
  { value: 4, name: "대구" },
  { value: 5, name: "광주" },
  { value: 6, name: "부산" },
  { value: 7, name: "울산" },
  { value: 8, name: "세종" },
  { value: 31, name: "경기" },
  { value: 32, name: "강원" },
  { value: 33, name: "충북" },
  { value: 34, name: "충남" },
  { value: 35, name: "경북" },
  { value: 36, name: "경남" },
  { value: 37, name: "전북" },
  { value: 38, name: "전남" },
  { value: 39, name: "제주" },
];

const currentButtonNumber = ref(0);
const localData = ref([]);
const currentData = ref([]);
const changeHotLocalItem = (number) => {
  currentButtonNumber.value = number;
};

onBeforeMount(() => {
  getHotLocal(
    (data) => {
      localData.value = data;
      currentData.value = localData.value.data[0];
      currentButtonNumber.value = 0;
    },
    (error) => {
      console.log(error);
    }
  );
});

watch(currentButtonNumber, () => {
  currentData.value = localData.value.data[currentButtonNumber.value];
});
</script>

<template>
  <div class="mt-56 mb-56">
    <div class="flex justify-center mb-24 mr-10">
      <div class="w-64 mb-4 border-b-4 -ml-52 border-main-color"></div>
      <div class="ml-6 text-4xl font-bold text-center text-main-color">Hot Local</div>
    </div>
    <div class="w-5/6 m-auto">
      <div class="flex justify-center" role="group">
        <MainHotLocalButton v-for="local in localNumber" :key="local.value" :local="local"
          @clickHotLocalButton="changeHotLocalItem"
          class="hover:text-white hover:bg-main-color focus:text-white inline-block rounded-s border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none">
        </MainHotLocalButton>
      </div>
      <div class="flex mt-6 justify-evenly mx-auto w-11/12">
        <MainHotLocalAttractionItem v-for="data in currentData" :attraction="data" :key="data.contentId"
          class="w-1/6 text-ellipsis flex">
        </MainHotLocalAttractionItem>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
