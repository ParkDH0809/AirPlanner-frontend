<script setup>
import MapPlannerSidebar from "@/components/map/planner-sidebar/MapPlannerSidebar.vue";
import MapInfoSidebar from "@/components/map/info-sidebar/MapInfoSidebar.vue";
import MapSearchSidebar from "@/components/map/search-sidebar/MapSearchSidebar.vue";
import MapBoard from "@/components/map/MapBoard.vue";
import { ref } from "vue";

const selectedAttraction = ref({});
function attractionInfo(attraction) {
  selectedAttraction.value = attraction;
}

const searchedAttractions = ref([]);
function attractionsInfo(attractions) {
  searchedAttractions.value = attractions;
}

const plannerListForMarker = ref([]);
function setMarkerPolyline(plannerList) {
  if (plannerList != null) {
    plannerListForMarker.value = plannerList;
  }
}
</script>

<template>
  <div class="planner-page-wrapper">
    <MapPlannerSidebar
      :attraction="selectedAttraction"
      @setMarkerPolyline="setMarkerPolyline"
    ></MapPlannerSidebar>
    <div class="relative left-72">
      <MapInfoSidebar :attraction="selectedAttraction"></MapInfoSidebar>
    </div>
    <MapSearchSidebar
      @attractionInfo="attractionInfo"
      @attractionsInfo="attractionsInfo"
    ></MapSearchSidebar>
    <MapBoard
      :attraction="selectedAttraction"
      :attractions="searchedAttractions"
      :plannerList="plannerListForMarker"
      @attractionInfo="attractionInfo"
    >
    </MapBoard>
  </div>
</template>

<style scoped>
.planner-page-wrapper {
  overflow: hidden;
}
</style>
