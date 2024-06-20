<script setup>
import { VueperSlides, VueperSlide } from "vueperslides";
import { getPlannerRandom } from "@/api/planner";
import { onMounted, ref } from "vue";
import "vueperslides/dist/vueperslides.css";
import plannerBg_01 from "@/assets/planner-bg-1.png";
import plannerBg_02 from "@/assets/planner-bg-2.png";
import plannerBg_03 from "@/assets/planner-bg-3.png";
import plannerBg_04 from "@/assets/planner-bg-4.png";
import plannerBg_05 from "@/assets/planner-bg-5.png";
import plannerBg_06 from "@/assets/planner-bg-6.png";
import plannerBg_07 from "@/assets/planner-bg-7.png";
import plannerBg_08 from "@/assets/planner-bg-8.png";
import plannerBg_09 from "@/assets/planner-bg-9.png";

function getPlanner() {
  getPlannerRandom(
    (data) => dataInsertSlides(data),
    (error) => console.log(error)
  );
}
const plannerBg = [
  plannerBg_01,
  plannerBg_02,
  plannerBg_03,
  plannerBg_04,
  plannerBg_05,
  plannerBg_06,
  plannerBg_07,
  plannerBg_08,
  plannerBg_09,
];
function dataInsertSlides(planner) {
  console.log(planner);
  let index = 0;
  slides.value = planner.data.map((planner) => {
    return {
      title: planner.plannerTitle,
      content: planner.userId + "님의 플래너",
      image: plannerBg[index++],
      plannerId: planner.plannerId,
    };
  });
}

onMounted(() => {
  getPlanner();
});

const slides = ref([]);
</script>

<template>
  <div class="m-auto mt-56 mb-8 overflow-auto w-128">
    <div class="flex justify-center mb-24 mr-10">
      <div class="w-64 mb-4 border-b-4 -ml-52 border-main-color"></div>
      <div class="ml-6 text-4xl font-bold text-center text-main-color">Hot Planner</div>
    </div>

    <div class="p-8 px-16">
      <vueper-slides
        class="no-shadow"
        :visible-slides="3"
        :fixed-height="true"
        slide-multiple
        :gap="3"
        :slide-ratio="1 / 4"
        :dragging-distance="200"
        :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
      >
        <vueper-slide
          v-for="(slide, i) in slides"
          class="rounded-md cursor-pointer opacity-90 bg vueperslide__title vueperslide__content slide"
          :key="i"
          :link="slide.link"
          @click="$router.push({ path: `/planner/${slide.plannerId}` })"
          :style="{ backgroundImage: `url(${slide.image})` }"
        >
          <template #content>
            <div
              class="absolute inset-0 flex flex-col items-center justify-center p-4 text-white bg-black bg-opacity-40 overlay"
            >
              <div class="flex-col">
                <p class="mb-4 text-xl font-extrabold text-center">
                  {{ slide.title }}
                </p>
                <p class="text-center">{{ slide.content }}</p>
              </div>
            </div>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>
  </div>
</template>
<style scoped>
.vueperslides--fixed-height {
  height: 250px;
}

.slide:hover {
  scale: 95%;
  border-radius: 0.5rem;
  opacity: 1;
}

.vueperslide__title {
  font-size: 1.1em;
  font-weight: 700;
  color: white;
}
</style>
