<script setup>
import ServiceBoard from "@/components/service/ServiceBoard.vue";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const useStore = useUserStore();
const category = ref("notice");
function changeCategory(newCategory) {
  category.value = newCategory;
}
</script>

<template>
  <div class="flex flex-col items-center w-full h-full ml-auto mr-auto lg:w-2/3 md:w-3/5">
    <h1 class="my-10 text-2xl font-bold text-main-color">SERVICE</h1>

    <div class="flex justify-between w-5/6 pb-2">
      <div class="flex mb-2 text-base text-main-color">
        <div class="mx-2">
          <div>
            <div class="cursor-pointer min-w-20" :class="category == 'notice' ? 'clicked' : ' '"
              @click="changeCategory('notice')">
              공지사항
            </div>
          </div>
        </div>
        <div class="mx-2">
          <div>
            <div class="cursor-pointer min-w-10" :class="category == 'question' ? 'clicked' : ' '"
              @click="changeCategory('question')">
              FAQ
            </div>
          </div>
        </div>
        <div class="mx-2">
          <div>
            <div class="cursor-pointer min-w-14" :class="category == 'howToUse' ? 'clicked' : ' '"
              @click="changeCategory('howToUse')">
              이용방법
            </div>
          </div>
        </div>
      </div>
      <div>
        <button v-if="useStore.userInfo != null && useStore.userInfo.userRole == 1"
          @click="$router.push('/service/post/0')"
          class="w-24 p-2 mb-1 text-base text-center text-white rounded-lg bg-main-color">
          Create
        </button>
      </div>
    </div>
    <div class="flex justify-between w-5/6 px-10">
      <div class="w-2/12">번호</div>
      <div class="w-8/12">제목</div>
      <div class="w-2/12">닉네임</div>
    </div>
    <ServiceBoard :category="category"></ServiceBoard>
  </div>
</template>

<style scoped>
.clicked {
  font-size: 1.1rem;
  font-weight: 800;
}
</style>
