<script setup>
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
</script>

<template>
  <MapInfoSidebar :attraction="selectedAttraction"></MapInfoSidebar>
  <MapSearchSidebar
    @attractionInfo="attractionInfo"
    @attractionsInfo="attractionsInfo"
  ></MapSearchSidebar>
  <MapBoard
    :attraction="selectedAttraction"
    :attractions="searchedAttractions"
    @attractionInfo="attractionInfo"
  ></MapBoard>
</template>

<style scoped></style>
