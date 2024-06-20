<script setup>
import ServiceBoardListItem from "@/components/service/ServiceBoardListItem.vue";
import { getBoards } from "@/api/board.js";
import { onMounted, ref } from "vue";

defineProps({
  category: String,
});

const noticeList = ref([]);
const questionList = ref([]);
const howToUseList = ref([]);

const getBoardList = () => {
  getBoards(
    ({ data }) => {
      noticeList.value = data.filter((list) => list.boardCategory == "notice");
      questionList.value = data.filter((list) => list.boardCategory == "question");
      howToUseList.value = data.filter((list) => list.boardCategory == "how-to-use");
    },
    (error) => {
      console.log(error);
    }
  );
};

onMounted(() => {
  getBoardList();
});
</script>

<template>
  <div class="flex items-center w-full h-3/5 dashboard-wrapper">
    <div class="w-5/6 p-5 m-2 ml-auto mr-auto h-full mostly-customized-scrollbar">
      <div v-if="category == 'notice'">
        <ServiceBoardListItem v-for="data in noticeList" :data="data"></ServiceBoardListItem>
      </div>
      <div v-else-if="category == 'question'">
        <ServiceBoardListItem v-for="data in questionList" :data="data"></ServiceBoardListItem>
      </div>
      <div v-else="category == 'how-to-use'">
        <ServiceBoardListItem v-for="data in howToUseList" :data="data"></ServiceBoardListItem>
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
