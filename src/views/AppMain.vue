<script setup>
import MainTitle from "@/components/main/MainTitle.vue";
import MainHotPlanner from "@/components/main/MainHotPlanner.vue";
import MainHotPlace from "@/components/main/MainHotPlace.vue";
import MainHotLocal from "@/components/main/MainHotLocal.vue";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({});
</script>

<template>
  <MainTitle />
  <MainHotPlanner data-aos="fade-right" data-aos-duration="2000" />
  <MainHotPlace data-aos="fade-left" data-aos-duration="2000" />
  <MainHotLocal data-aos="fade-up" data-aos-duration="2000" />
</template>

<style scoped></style>
