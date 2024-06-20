<script setup>
import draggable from "vuedraggable";
import OpenAI from "openai";
import { ref, watch } from "vue";
import Swal from "sweetalert2";
import StarRating from "vue-star-rating";
// defineProps & defineEmits
const props = defineProps(["addedAttraction", "travelDate", "plannerData"]);
const emit = defineEmits(["set-marker-polyline"]);

const attractionList = ref([]);
let AttractionsIndexNumber = 0;
function addAttraction(index) {
  if (props.addedAttraction.contentId == null) {
    alert("선택된 관광지가 없습니다.");
  } else {
    attractionList.value[index].attractions.push({
      attraction: props.addedAttraction,
      number: AttractionsIndexNumber++,
      index: index,
    });
  }
}

const getGPTResponse = async (index) => {
  try {
    const openai = new OpenAI({
      apiKey: `${import.meta.env.VITE_OPENAI_API_KEY}`,
      dangerouslyAllowBrowser: true,
    });

    let prompt = ``;
    attractionList.value[index].attractions.forEach(
      (element) => (prompt += element.attraction.title + ", ")
    );
    prompt += "를 갈건데 가장 효율적인 경로를 추천해주세요. 리스트 형식으로 성의있게 반환해줘.";
    console.log(prompt);
    // 로딩 알림 표시
    Swal.fire({
      title: "로딩 중...",
      text: "AI가 경로를 추천 중입니다. 잠시만 기다려주세요.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(response.choices[0].message.content);
    Swal.fire({
      title: "AI 경로 추천입니다!",
      text: response.choices[0].message.content,
      icon: "success",
    });
  } catch (error) {
    console.log("chatGPT: 🚨 에러가 발생했습니다.");
  }
};

function deleteElement(element) {
  attractionList.value[element.index].attractions = attractionList.value[
    element.index
  ].attractions.filter((attr) => attr.number != element.number);
}

watch(
  props,
  () => {
    if (props.travelDate == null) {
      return;
    }

    if (props.travelDate != attractionList.value.length) {
      AttractionsIndexNumber = 0;
      attractionList.value = Array(props.travelDate);
      for (var i = 0; i < props.travelDate; i++) {
        attractionList.value[i] = {};
        attractionList.value[i].arrayIndex = i;
        attractionList.value[i].attractions = [];
      }
    }

    if (props.plannerData.length != 0) {
      attractionList.value = props.plannerData;
    }
  },
  { deep: true }
);

watch(
  attractionList,
  () => {
    emit("set-marker-polyline", attractionList.value);
  },
  { deep: true }
);
</script>

<template>
  <!-- selected attraction start -->
  <div class="w-full px-2">
    <div class="flex flex-row justify-between mx-1">
      <div class="mx-2">{{ addedAttraction.title }}</div>
    </div>
  </div>
  <!-- selected attraction end -->
  <div v-if="travelDate == null">날짜를 선택해주세요.</div>
  <!-- draggable container start -->
  <div class="flex flex-col items-center justify-center w-64 draggable-container">
    <!-- draggable start -->
    <draggable
      v-for="list in attractionList"
      :list="list.attractions"
      class="w-full mt-1 border-t-2 list-group border-t-main-color"
      group="travelPlan"
      item-key="list.index"
    >
      <template #header>
        <div class="p-1 list-group-item" role="group" aria-label="Basic example">
          <div class="flex justify-between text-black btn btn-secondary">
            <div>DAY{{ list.arrayIndex + 1 }}</div>
            <div class="flex-col">
              <div
                @click="getGPTResponse(list.arrayIndex)"
                class="flex flex-row p-1 ml-8 cursor-pointer hover:scale-105"
              >
                <img class="w-7" src="@/assets/ai.png" alt="" />
                <span>경로추천!</span>
              </div>

              <div
                @click="addAttraction(list.arrayIndex)"
                class="w-10 p-1 ml-auto text-xs text-center text-white border-2 border-white rounded-md cursor-pointer bg-main-color"
              >
                Add
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #item="{ element }">
        <div class="flex-col justify-between p-2 mb-1 border-t-2 list-group-item item">
          <p class="mb-3 font-bold">{{ element.attraction.title }}</p>
          <p class="text-xs">{{ element.attraction.addr1 }}</p>
          <star-rating
            :rating="element.attraction.scoreAvg"
            :read-only="true"
            :star-size="15"
            :show-rating="false"
            :inline="true"
            :increment="0.1"
          ></star-rating>
          <button @click="deleteElement(element)" class="block w-6 mt-2 ml-auto">
            <img src="@/assets/deleteIcon.png" alt="" />
          </button>
        </div>
      </template>
    </draggable>
    <!-- draggable end -->
  </div>
  <!-- draggable container end -->
</template>

<style scoped></style>
