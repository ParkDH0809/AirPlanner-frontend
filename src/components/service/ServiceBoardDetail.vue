<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useRoute, useRouter } from "vue-router";
import { getBoard, deleteBoard } from "@/api/board.js";

const userStore = useUserStore();
const board = ref({});
const route = useRoute();

const getOne = () => {
  getBoard(
    route.params.id,
    ({ data }) => {
      board.value = data;
      board.value.boardCreateAt =
        board.value.boardCreateAt.substr(0, 10) + " " + board.value.boardCreateAt.substr(11, 8);
      board.value.boardModifyAt =
        board.value.boardModifyAt.substr(0, 10) + " " + board.value.boardModifyAt.substr(11, 8);
    },
    (error) => {
      console.log(error);
    }
  );
};

const router = useRouter();
const deleteOne = () => {
  if (confirm("해당 게시글을 삭제하시겠습니까?")) {
    deleteBoard(
      route.params.id,
      () => { },
      (error) => {
        console.log(error);
      }
    );
    alert("게시글이 삭제되었습니다.");
    router.push({ name: "service" });
  }
};

const updateOne = () => {
  router.push({
    name: "ServicePost",
    params: { boardId: board.value.boardId },
  });
};

onMounted(() => {
  getOne();
});
</script>

<template>
  <div class="flex flex-col items-center w-full ml-auto mr-auto lg:w-2/3 md:w-4/5">
    <h1 class="mt-10 text-2xl font-bold text-main-color">SERVICE</h1>
    <div class="flex flex-col items-center w-full dashboard-wrapper">
      <!-- button start -->
      <div v-if="userStore.userInfo != null && userStore.userInfo.userRole == 1" class="flex flex-row-reverse w-5/6">
        <button @click="updateOne"
          class="w-20 m-1 text-base leading-tight text-center text-white rounded-lg bg-main-color">
          수정하기
        </button>
        <button @click="deleteOne"
          class="w-20 p-2 m-1 text-base leading-tight text-center text-white bg-red-400 rounded-lg">
          삭제하기
        </button>
      </div>
      <!-- button end -->
      <!-- board start -->
      <div class="flex flex-col items-center w-5/6 px-5 pt-3 ml-auto mr-auto">
        <div class="flex items-center justify-between w-full mb-4 border-b-2">
          <div class="min-w-24">{{ board.boardId }} / {{ board.boardAdminId }}</div>
          <div class="text-2xl font-bold">{{ board.boardTitle }}</div>
          <div class="font-bold text-center border-2 border-gray-300 rounded-md min-w-24">
            {{ board.boardCategory }}
          </div>
        </div>
        <div>
          <div class="m-auto break-all border-2 content-container">
            <div class="w-full h-full text-lg mostly-customized-scrollbar font-base">
              {{ board.boardContent }}
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-between w-full mt-2">
          <div class="w-1/2">Create time: {{ board.boardCreateAt }}</div>
          <div class="w-1/2 text-right">Last modify time: {{ board.boardModifyAt }}</div>
        </div>
      </div>
      <!-- board end -->
    </div>
  </div>
</template>

<style scoped>
.content-container {
  width: 53vw;
  height: 35rem;
}

.mostly-customized-scrollbar {
  overflow-y: auto;
}

/* Demonstrate a "mostly customized" scrollbar
 * (won't be visible otherwise if width/height is specified) */
.mostly-customized-scrollbar::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
  /* or add it to the track */
}

/* Add a thumb */
.mostly-customized-scrollbar::-webkit-scrollbar-thumb {
  background: #2e3a65;
}
</style>
