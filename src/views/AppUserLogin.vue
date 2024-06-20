<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/user.js";
import { useUserStore } from "@/stores/user";
import Swal from "sweetalert2";

const router = useRouter();
const showPassword = ref();

const userId = ref();
const userPassword = ref();
const param = ref({
  userId: userId,
  userPassword: userPassword,
});
const userStore = useUserStore();
function userLogin() {
  login(
    param.value,
    (success) => loginSuccess(success),
    (error) => loginFailure(error)
  );
}

function loginSuccess(success) {
  userStore.userInfo = success.data;
  if (userStore.userInfo.userRole == 1) {
    Swal.fire({
      title: "관리자 권한으로 로그인 성공!!!!",
      text: "주인님 환영합니다!",
      icon: "warning",
    });
  } else {
    Swal.fire({
      title: "로그인 성공!!!!",
      text: userStore.userInfo.userNickName + "님 환영합니다!",
      icon: "success",
    });
  }

  router.push({ name: "main" });
}

function loginFailure() {
  Swal.fire({
    title: "로그인 실패..",
    text: "아이디와 비밀번호를 다시 확인해주세요.",
    icon: "error",
  });
}
</script>

<template>
  <!-- This is an example component -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
  />
  <div class="flex">
    <div class="flex flex-col items-center w-full ml-auto mr-auto lg:w-2/3 md:w-3/5">
      <h1 class="my-10 text-2xl font-bold text-main-color">LOGIN</h1>
      <form action="submit" class="flex flex-col w-8/12 mt-2 lg:w-1/2">
        <!-- ID input start -->
        <div
          class="relative flex flex-wrap items-center w-full p-1 pr-10 mb-6 bg-white border-2 rounded-lg border-main-color h-15"
        >
          <div class="flex justify-center p-4 -mr-px w-15">
            <span
              class="flex items-center px-3 text-2xl leading-normal text-gray-600 bg-white border-0 rounded rounded-r-none"
            >
              <i class="fas fa-user-circle"></i>
            </span>
          </div>
          <input
            type="text"
            v-model="userId"
            class="relative self-center flex-auto flex-grow flex-shrink w-px h-10 pr-3 text-xl leading-normal border-0 rounded rounded-l-none outline-none border-grey-light font-roboto"
            placeholder="ID"
          />
        </div>
        <!-- ID input end -->
        <!-- Password input start-->
        <div
          class="relative flex flex-wrap items-center w-full p-1 mb-6 bg-white border-2 rounded-lg border-main-color h-15"
        >
          <div class="flex justify-center p-4 -mr-px w-15">
            <span
              class="flex items-center px-3 ml-1 text-2xl leading-normal text-gray-600 whitespace-no-wrap bg-white rounded rounded-r-none"
            >
              <i class="fas fa-lock"></i>
            </span>
          </div>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="userPassword"
            class="relative self-center flex-auto flex-grow flex-shrink w-px h-10 text-xl leading-normal border-0 outline-none font-roboto"
            placeholder="Password"
          />
          <div class="flex -mr-px">
            <span
              class="flex items-center px-3 leading-normal text-gray-600 whitespace-no-wrap bg-white border-0 rounded rounded-l-none"
            >
              <i
                class="fas fa-eye"
                :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                @click="showPassword = !showPassword"
              ></i>
            </span>
          </div>
        </div>
        <!-- Password input end-->
        <a
          href="#"
          class="pb-2 text-xs leading-normal text-right text-main-color font-roboto hover:underline"
          >Forget Password ?</a
        >
        <div class="flex items-stretch">
          <router-link
            :to="{ name: 'signup' }"
            class="flex-auto py-4 mt-4 mb-20 mr-2 text-xl leading-tight text-center text-white rounded-lg bg-main-color px-17 md:px-12 md:py-4 md:text-base"
            >Signup</router-link
          >
          <div
            @click="userLogin"
            class="flex-auto py-4 mt-4 mb-20 ml-2 text-xl leading-tight text-center bg-white border-2 rounded-lg cursor-pointer text-main-color border-main-color px-17 md:px-12 md:py-4 md:text-base"
          >
            Login
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped></style>
