<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { update } from "@/api/user.js";
import { storeToRefs } from "pinia";

const useStore = useUserStore();

const { userInfo } = storeToRefs(useStore);

const showPassword = ref();

const param = ref({
  userId: userInfo.value.userId,
  userPassword: userInfo.value.userPassword,
  userName: userInfo.value.userName,
  userNickName: userInfo.value.userNickName,
  userEmail: userInfo.value.userEmail,
  userTel: userInfo.value.userTel,
});

function userUpdate() {
  update(
    param.value,
    (success) => updateSuccess(success),
    (error) => updateFailure(error)
  );
}

function updateSuccess(success) {
  userInfo.value = param.value;
  alert("정상적으로 수정되었습니다.");
}

function updateFailure(error) {
  alert("수정 실패");
  console.log(error);
}
</script>

<template>
  <div class="flex justify-center w-full overflow-auto">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />
    <form action="" class="flex flex-col w-8/12 mt-2 lg:w-1/2">
      <!-- ID input start -->
      <div
        class="relative flex flex-wrap items-center w-full p-1 pr-10 mb-6 bg-white border-2 rounded-lg border-main-color h-15">
        <span class="-ml-16 font-bold text-main-color">아이디</span>
        <div class="flex justify-center p-4 -mr-px w-15 "></div>

        <input type="text"
          class="relative self-center flex-auto flex-grow flex-shrink w-px h-10 pr-3 text-xl leading-normal border-0 rounded rounded-l-none outline-none border-grey-light font-roboto"
          placeholder="ID" v-model="userInfo.userId" disabled />
      </div>

      <!-- ID input end -->
      <!-- Password input start -->
      <div
        class="relative flex flex-wrap items-center w-full p-1 mb-6 bg-white border-2 rounded-lg border-main-color h-15">
        <span class="-ml-20 font-bold text-main-color">비밀번호</span>
        <div class="flex justify-center p-4 -mr-px w-15"></div>
        <input :type="showPassword ? 'text' : 'password'"
          class="relative self-center flex-auto flex-grow flex-shrink w-px h-10 text-xl leading-normal border-0 outline-none font-roboto"
          placeholder="Password" v-model="param.userPassword" />
        <div class="flex -mr-px">
          <span
            class="flex items-center px-3 leading-normal text-gray-600 whitespace-no-wrap bg-white border-0 rounded rounded-l-none">
            <i class="fas fa-eye" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
              @click="showPassword = !showPassword"></i>
          </span>
        </div>
      </div>
      <!-- Password input end-->
      <!-- Name input start-->
      <div
        class="relative flex flex-wrap items-center w-full p-1 pr-10 mb-6 bg-white border-2 rounded-lg border-main-color h-15">
        <span class="-ml-12 font-bold text-main-color">이름</span>
        <div class="flex justify-center p-4 -mr-px w-15"></div>
        <input type="text"
          class="relative self-center flex-auto flex-grow flex-shrink w-px h-10 pr-3 text-xl leading-normal border-0 rounded rounded-l-none outline-none border-grey-light font-roboto"
          placeholder="Name" v-model="param.userName" />
      </div>
      <!-- Name input end-->
      <!-- Nickname input start-->
      <div
        class="relative flex flex-wrap items-center w-full p-1 pr-10 mb-6 bg-white border-2 rounded-lg border-main-color h-15">
        <span class="-ml-16 font-bold text-main-color">닉네임</span>
        <div class="flex justify-center p-4 -mr-px w-15"></div>
        <input type="text"
          class="relative self-center flex-auto flex-grow flex-shrink w-px h-10 pr-3 text-xl leading-normal border-0 rounded rounded-l-none outline-none border-grey-light font-roboto"
          placeholder="Nickname" v-model="param.userNickName" />
      </div>
      <!-- Nickname input end-->
      <!-- Email input start-->
      <div
        class="relative flex flex-wrap items-center w-full p-1 pr-10 mb-6 bg-white border-2 rounded-lg border-main-color h-15">
        <span class="-ml-16 font-bold text-main-color">이메일</span>
        <div class="flex justify-center p-4 -mr-px w-15"></div>
        <input type="text"
          class="relative self-center flex-auto flex-grow flex-shrink w-px h-10 pr-3 text-xl leading-normal border-0 rounded rounded-l-none outline-none border-grey-light font-roboto"
          placeholder="Email" v-model="param.userEmail" />
      </div>
      <!-- Email input end-->
      <!-- Tel input start-->
      <div
        class="relative flex flex-wrap items-center w-full p-1 pr-10 mb-6 bg-white border-2 rounded-lg border-main-color h-15">
        <span class="-ml-20 font-bold text-main-color">전화번호</span>
        <div class="flex justify-center p-4 -mr-px w-15"></div>
        <input type="text"
          class="relative self-center flex-auto flex-grow flex-shrink w-px h-10 pr-3 text-xl leading-normal border-0 rounded rounded-l-none outline-none border-grey-light font-roboto"
          placeholder="Tel" v-model="param.userTel" />
      </div>
      <!-- Tel input end-->
      <div class="flex flex-wrap items-stretch">
        <button @click="userUpdate"
          class="flex-auto py-4 mt-4 mr-2 text-xl leading-tight text-center text-white rounded-lg bg-main-color px-17 md:px-12 md:py-4 md:text-base">
          수정하기
        </button>
        <a href="/"
          class="flex-auto py-4 mt-4 ml-2 text-xl leading-tight text-center text-white bg-red-400 rounded-lg px-17 md:px-12 md:py-4 md:text-base">
          회원탈퇴
        </a>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
