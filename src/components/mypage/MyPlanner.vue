<script setup>
import { getPlanners, getPlannersByUserId } from "@/api/planner.js";
import { useUserStore } from "@/stores/user";
import { ref, onMounted } from "vue";
import PlannerCard from "@/components/item/PlannerCard.vue";
import plannerBg_01 from "@/assets/planner-bg-1.png";
import plannerBg_02 from "@/assets/planner-bg-2.png";
import plannerBg_03 from "@/assets/planner-bg-3.png";
import plannerBg_04 from "@/assets/planner-bg-4.png";
import plannerBg_05 from "@/assets/planner-bg-5.png";
import plannerBg_06 from "@/assets/planner-bg-6.png";
import plannerBg_07 from "@/assets/planner-bg-7.png";
import plannerBg_08 from "@/assets/planner-bg-8.png";
import plannerBg_09 from "@/assets/planner-bg-9.png";

// session
const useStore = useUserStore();

// get planners
const plannerBg = [plannerBg_01, plannerBg_02, plannerBg_03, plannerBg_04, plannerBg_05, plannerBg_06, plannerBg_07, plannerBg_08, plannerBg_09]
let plannerNumber = 0;
const planners = ref([]);
function getMyPlanners() {
  if (useStore.userInfo.userRole == 1) {
    getPlanners(
      ({ data }) => {
        initPlannersData(data)
      },
      (error) => {
        console.log(error);
      }
    )
  } else {
    getPlannersByUserId(
      useStore.userInfo.userId,
      ({ data }) => {
        initPlannersData(data)
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

function initPlannersData(data) {
  data.forEach((element) => {
        planners.value.push({
          plannerId: element.plannerId,
          plannerTitle: element.plannerTitle,
          plannerSDate: element.plannerSDate,
          plannerEDate: element.plannerEDate,
          plannerThumbnail: plannerBg[plannerNumber++]
        });
        plannerNumber %= plannerBg.length
      });
}

onMounted(() => {
  getMyPlanners();
});
</script>

<template>
  <div class="relative flex flex-wrap py-3 justify-center">
    <PlannerCard v-for="planner in planners" :key="planner.plannerId" :planner="planner" />
  </div>
</template>

<style scoped></style>
