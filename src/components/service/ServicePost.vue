<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createBoard, updateBoard } from "@/api/board.js";
import { getBoard } from "@/api/board.js";
import { useUserStore } from "@/stores/user";

const useStore = useUserStore();

const board = ref({});
const router = useRouter();
const boardTitle = ref();
const boardContent = ref();
const boardCategory = ref();
const boardAdminId = ref(useStore.userInfo.userId);

const getOne = () => {
  getBoard(
    route.params.boardId,
    ({ data }) => {
      board.value = data;
      boardTitle.value = data.boardTitle;
      boardContent.value = data.boardContent;
      boardCategory.value = data.boardCategory;
      boardAdminId.value = data.boardAdminId;
      console.log(data);
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

const route = useRoute();

const param = ref({
  boardId: route.params.boardId,
  boardTitle: boardTitle,
  boardContent: boardContent,
  boardCategory: boardCategory,
  boardAdminId: boardAdminId,
});

const createOne = () => {
  if (route.params.boardId != 0) {
    updateBoard(
      route.params.boardId,
      param.value,
      () => {
        alert("수정이 완료되었습니다.");
        router.push({ name: "service" });
      },
      (error) => {
        console.log(error);
      }
    );
  } else {
    createBoard(
      param.value,
      () => {
        alert("작성이 완료되었습니다.");
        router.push({ name: "service" });
      },
      (error) => {
        console.log(error);
      }
    );
  }
};

onMounted(() => {
  if (route.params.boardId != 0) {
    getOne();
  }
});
</script>

<template>
  <div class="flex flex-col items-center ml-auto mr-auto lg:w-2/3 md:w-4/5">
    <h1 class="mt-10 text-2xl font-bold text-main-color">SERVICE</h1>
    <div class="flex flex-col items-center w-full dashboard-wrapper">
      <!-- button start -->
      <div class="flex flex-row-reverse w-5/6">
        <button @click="createOne"
          class="w-20 p-2 mr-6 m-1 text-base leading-tight text-center text-white rounded-lg bg-main-color">
          Finish
        </button>
      </div>
      <!-- button end -->
      <!-- board start -->
      <div class="flex flex-col items-center w-5/6 h-full p-5 ml-auto mr-auto">
        <div class="flex items-center justify-between w-full pb-2 mb-4">
          <div class="min-w-24 max-w-32 ml-1">
            <input v-model="boardAdminId" class="bg-white" disabled />
          </div>
          <div class="text-xl font-base">
            <input v-model="boardTitle" class="border-b-2" palceholder="Title" />
          </div>
          <div class="font-bold text-center border-2 mr-1 border-gray-300 rounded-md min-w-24 max-w-40">
            <div>
              <select v-model="boardCategory">
                <option value="notice">notice</option>
                <option value="question">question</option>
                <option value="how-to-use">how-to-use</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <div class="m-auto break-all border-2 content-container">
            <div class="w-full h-full text-lg break-all font-base">
              <textarea v-model="boardContent" class="w-full p-2 mostly-customized-scrollbar resize-none outline-none"
                style="height: 99%"></textarea>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-between w-full mt-2">
          <div v-if="board.boardCreateAt != null" class="w-1/2">
            Create time: {{ board.boardCreateAt }}
          </div>
          <div v-if="board.boardCreateAt != null" class="w-1/2 text-right">
            Last modify time: {{ board.boardModifyAt }}
          </div>
        </div>
      </div>
      <!-- board end -->
    </div>
  </div>
</template>

<style scoped>
.content-container {
  width: 53vw;
  height: 34rem;
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
