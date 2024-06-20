<script setup>
import { useUserStore } from "@/stores/user";
import Swal from "sweetalert2";

const userStore = useUserStore();
function logout() {
  userStore.userInfo = null;
  Swal.fire({
    title: "로그아웃 되었습니다.",
    text: "안녕히가세요",
    icon: "success",
  });
}
</script>

<template>
  <header class="flex px-6 py-5 text-gray-700 shadow-sm h-1/12">
    <router-link
      :to="{ name: 'main' }"
      class="flex items-center font-medium text-gray-900 title-font"
    >
      <img class="w-1/2" src="@/assets/logo.png" />
    </router-link>
    <nav class="flex items-center justify-center mr-auto text-base">
      <router-link :to="{ name: 'planner' }" class="mr-5 font-medium hover:text-gray-900"
        >Planner</router-link
      >
      <router-link :to="{ name: 'map' }" class="mr-5 font-medium hover:text-gray-900"
        >Map</router-link
      >
      <router-link :to="{ name: 'service' }" class="mr-5 font-medium hover:text-gray-900"
        >Service</router-link
      >
    </nav>
    <div class="flex items-center mr-5" v-if="!userStore.isLoggedIn">
      <router-link :to="{ name: 'login' }" class="mr-5 font-medium hover:text-gray-900"
        >Login</router-link
      >
      <router-link :to="{ name: 'signup' }" class="mr-5 font-medium hover:text-gray-900"
        >SignUp</router-link
      >
    </div>
    <div class="flex items-center mr-5" v-if="userStore.isLoggedIn">
      <router-link
        :to="{ name: 'main' }"
        class="mr-5 font-medium hover:text-gray-900"
        @click.native="logout"
      >
        Logout
      </router-link>
      <router-link :to="{ name: 'mypage' }" class="mr-5 font-medium hover:text-gray-900"
        >MyPage</router-link
      >
      <p v-if="userStore.isLoggedIn">{{ userStore.userInfo.userNickName }}님 환영합니다!!!</p>
    </div>
  </header>
</template>

<style scoped></style>
