<script setup>
import MapSearchSidebarItem from "@/components/map/search-sidebar/MapSearchSidebarItem.vue";
import { ref, onMounted } from "vue";
import { search } from "@/api/map.js";

// defineEmits
const emit = defineEmits(["attraction-info", "attractions-info"]);
function attractionInfo(attraction) {
  emit("attraction-info", attraction);
}

// component draggable variable
const isOpened = ref(true);

// search variable
const searchResult = ref([]);
const searchKeyword = ref("");
const sidoCode = ref(0);
const contentTypeId = ref(0);
const searchData = ref({
  searchKeyword: searchKeyword,
  sidoCode: sidoCode,
  contentTypeId: contentTypeId,
});

function searchPlace() {
  search(
    searchData.value,
    ({ data }) => initResult(data),
    (error) => console.log(error)
  );
}

function initResult(data) {
  searchResult.value = data;
  if (searchResult.value.length == 0) {
    alert("검색 결과가 없습니다.");
  } else {
    emit("attractions-info", searchResult.value);
  }
}

// mounted
onMounted(() => {
  const { AttractionTitle } = history.state;

  if (AttractionTitle != null) {
    searchKeyword.value = AttractionTitle.AttractionName;
    search(
      { searchKeyword: searchKeyword.value },
      ({ data }) => initResult(data),
      (error) => console.log(error)
    );
  }
});
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
  />
  <div class="sidebar-container">
    <div class="absolute right-0 z-10 flex overflow-x-hidden flex-reverse" style="height: 85.5vh">
      <!--drawer start -->
      <button
        @click="isOpened = !isOpened"
        class="w-6 h-48 p-1 my-auto text-center duration-300 bg-main-color focus:outline-none hover:bg-gray-500 transition-color"
        style="border-top-left-radius: 3rem; border-bottom-left-radius: 3rem"
      >
        <div v-if="isOpened">
          <span><i class="text-white fas fa-arrow-right"></i></span>
        </div>
        <div v-else>
          <span><i class="text-white fas fa-arrow-left"></i></span>
        </div>
      </button>
      <!--drawer end -->

      <!-- sidebar content start-->
      <div
        ref="content"
        class="transition-all duration-700 bg-white overflow-x-hidden mostly-customized-scrollbar shadow-[0_25px_10px_0px] shadow-main-color"
        :class="[isOpened ? 'max-w-lg' : 'max-w-0']"
      >
        <div class="h-full text-xl font-bold text-center w-96">
          <div class="flex flex-col items-center w-full h-full">
            <!-- search input start -->
            <div
              class="absolute flex flex-col px-3 py-1 bg-white border-b-2 w-96 border-b-main-color"
            >
              <div
                class="flex flex-row items-center w-full p-1 mb-2 bg-white border-2 rounded-lg border-main-color h-15"
              >
                <input
                  type="text"
                  id="keyword"
                  v-model="searchKeyword"
                  @keyup.enter="searchPlace"
                  class="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  autocomplete="off"
                />
                <button type="submit" @click="searchPlace">
                  <span><i class="mx-2 fa fa-search" aria-hidden="true"></i></span>
                </button>
              </div>
              <div
                class="relative flex flex-row items-center w-full p-1 mb-2 bg-white border-2 rounded-lg border-main-color h-15"
              >
                <div class="text-sm font-thin text-center rounded-md min-w-24">
                  <div class="flex justify-between">
                    <select class="w-1/2 mx-10" name="sidoCode" v-model="sidoCode">
                      <option value="0" selected>지역 선택</option>
                      <option value="1">서울</option>
                      <option value="2">인천</option>
                      <option value="3">대전</option>
                      <option value="4">대구</option>
                      <option value="5">광주</option>
                      <option value="6">부산</option>
                      <option value="7">울산</option>
                      <option value="8">세종특별자치시</option>
                      <option value="31">경기도</option>
                      <option value="32">강원도</option>
                      <option value="33">충청북도</option>
                      <option value="34">충청남도</option>
                      <option value="35">경상북도</option>
                      <option value="36">경상남도</option>
                      <option value="37">전라북도</option>
                      <option value="38">전라남도</option>
                      <option value="39">제주도</option>
                    </select>
                    <select name="contentTypeId" class="w-1/2" v-model="contentTypeId">
                      <option value="0" selected>관광지 유형</option>
                      <option value="12">관광지</option>
                      <option value="14">문화시설</option>
                      <option value="15">축제공연행사</option>
                      <option value="25">여행코스</option>
                      <option value="28">레포츠</option>
                      <option value="32">숙박</option>
                      <option value="38">쇼핑</option>
                      <option value="39">음식점</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <!-- search input end -->

            <!-- search data start -->
            <div class="pt-28">
              <MapSearchSidebarItem
                v-for="result in searchResult"
                :result="result"
                :key="result.id"
                @attractionInfo="attractionInfo"
              >
              </MapSearchSidebarItem>
            </div>
            <!-- search data end -->
          </div>
        </div>
      </div>
      <!-- sidebar content end-->
    </div>
  </div>
</template>

<style scoped>
.mostly-customized-scrollbar {
  overflow-y: scroll;
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
