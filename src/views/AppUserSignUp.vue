<script setup>
import { ref } from "vue";
import { signUp } from "@/api/user.js";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
const router = useRouter();
const showPassword = ref();

const userId = ref();
const userPassword = ref();
const userName = ref();
const userNickName = ref();
const userEmail = ref();
const userTel = ref();

const param = ref({
  userId: userId,
  userPassword: userPassword,
  userName: userName,
  userNickName: userNickName,
  userEmail: userEmail,
  userTel: userTel,
});

function userSignUp() {
  signUp(
    param.value,
    () => signUpSuccess(),
    (error) => console.log(error)
  );
}

function signUpSuccess() {
  Swal.fire({
    title: "회원가입 성공!!!!",
    text: "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.",
    icon: "success",
  });
  router.push({ name: "login" });
}
</script>

<template>
  <div>
    <!-- This is an example component -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
    />
    <div class="flex h-full">
      <div class="flex flex-col items-center w-full ml-auto mr-auto lg:w-2/3 md:w-3/5">
        <h1 class="my-10 text-2xl font-bold text-main-color">SIGNUP</h1>
        <form action="" class="flex flex-col w-8/12 mt-2 lg:w-1/2">
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
              class="relative self-center flex-auto flex-grow flex-shrink w-px h-10 pr-3 text-xl leading-normal border-0 rounded rounded-l-none outline-none border-grey-light font-roboto"
              placeholder="ID"
              v-model="userId"
            />
          </div>
          <!-- ID input end -->
          <!-- Password input start -->
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
              class="relative self-center flex-auto flex-grow flex-shrink w-px h-10 text-xl leading-normal border-0 outline-none font-roboto"
              placeholder="Password"
              v-model="userPassword"
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
          <!-- Name input start-->
          <div
            class="relative flex flex-wrap items-center w-full p-1 pr-10 mb-6 bg-white border-2 rounded-lg border-main-color h-15"
          >
            <div class="flex justify-center p-4 -mr-px w-15">
              <span
                class="flex items-center px-3 text-2xl leading-normal text-gray-600 bg-white border-0 rounded rounded-r-none"
              >
                <i class="fas fa-id-card"></i>
              </span>
            </div>
            <input
              type="text"
              class="relative self-center flex-auto flex-grow flex-shrink w-px h-10 pr-3 text-xl leading-normal border-0 rounded rounded-l-none outline-none border-grey-light font-roboto"
              placeholder="Name"
              v-model="userName"
            />
          </div>
          <!-- Name input end-->
          <!-- Nickname input start-->
          <div
            class="relative flex flex-wrap items-center w-full p-1 pr-10 mb-6 bg-white border-2 rounded-lg border-main-color h-15"
          >
            <div class="flex justify-center p-4 -mr-px w-15">
              <span
                class="flex items-center px-3 text-2xl leading-normal text-gray-600 bg-white border-0 rounded rounded-r-none"
              >
                <i class="fas fa-tag"></i>
              </span>
            </div>
            <input
              type="text"
              class="relative self-center flex-auto flex-grow flex-shrink w-px h-10 pr-3 text-xl leading-normal border-0 rounded rounded-l-none outline-none border-grey-light font-roboto"
              placeholder="Nickname"
              v-model="userNickName"
            />
          </div>
          <!-- Nickname input end-->
          <!-- Email input start-->
          <div
            class="relative flex flex-wrap items-center w-full p-1 pr-10 mb-6 bg-white border-2 rounded-lg border-main-color h-15"
          >
            <div class="flex justify-center p-4 -mr-px w-15">
              <span
                class="flex items-center px-3 text-2xl leading-normal text-gray-600 bg-white border-0 rounded rounded-r-none"
              >
                <i class="fas fa-envelope"></i>
              </span>
            </div>
            <input
              type="text"
              class="relative self-center flex-auto flex-grow flex-shrink w-px h-10 pr-3 text-xl leading-normal border-0 rounded rounded-l-none outline-none border-grey-light font-roboto"
              placeholder="Email"
              v-model="userEmail"
            />
          </div>
          <!-- Email input end-->
          <!-- Tel input start-->
          <div
            class="relative flex flex-wrap items-center w-full p-1 pr-10 mb-6 bg-white border-2 rounded-lg border-main-color h-15"
          >
            <div class="flex justify-center p-4 -mr-px w-15">
              <span
                class="flex items-center px-3 text-2xl leading-normal text-gray-600 bg-white border-0 rounded rounded-r-none"
              >
                <i class="fas fa-phone"></i>
              </span>
            </div>
            <input
              type="text"
              class="relative self-center flex-auto flex-grow flex-shrink w-px h-10 pr-3 text-xl leading-normal border-0 rounded rounded-l-none outline-none border-grey-light font-roboto"
              placeholder="Tel"
              v-model="userTel"
            />
          </div>
          <!-- Tel input end-->
          <div class="flex items-stretch">
            <div
              @click="userSignUp"
              class="flex-auto py-4 mt-4 mb-20 text-xl leading-tight text-center text-white rounded-lg cursor-pointer bg-main-color px-17 md:px-12 md:py-4 md:text-base"
            >
              Signup
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
