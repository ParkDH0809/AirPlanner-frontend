<script setup>
import MyPageBoard from "@/components/mypage/MyPageBoard.vue";
import { ref } from "vue";

const category = ref("myInfo");
function changeCategory(newCategory) {
  category.value = newCategory;
}
</script>

<template>
  <div class="flex flex-col items-center mx-auto w-4/5 ">
    <h1 class="my-10 text-2xl font-bold text-main-color">MY PAGE</h1>
    <div class="flex items-center w-full dashboard-wrapper">
      <div class="w-2/12 h-full m-2 rounded-lg ">
        <div class="flex flex-col p-10">
          <div class="my-5 text-2xl text-gray-500 cursor-pointer" :class="category == 'myInfo' ? 'clicked' : ' '"
            @click="changeCategory('myInfo')">
            My MyInfo
          </div>
          <hr />
          <div class="my-5 text-2xl text-gray-500 cursor-pointer" :class="category == 'myPlanner' ? 'clicked' : ' '"
            @click="changeCategory('myPlanner')">
            My Planner
          </div>
          <hr />
          <div class="my-5 text-2xl text-gray-500 cursor-pointer" :class="category == 'myReview' ? 'clicked' : ' '"
            @click="changeCategory('myReview')">
            My Review
          </div>
          <hr />
        </div>
      </div>
      <div class="w-4/6 h-full px-5 m-2 rounded-lg">
        <MyPageBoard :category="category"></MyPageBoard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  height: 62vh;
}

.clicked {
  color: rgb(46 58 101 / var(--tw-text-opacity));
  font-weight: 800;
  font-size: 1.5rem;
  line-height: 2rem;
}
</style>
