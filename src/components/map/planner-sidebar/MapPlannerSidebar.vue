<script setup>
import { ref, watch, onMounted } from "vue";
import { createPlanner, getPlanner } from "@/api/planner.js";
import { selectAttraction } from "@/api/map.js";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import MapPlannerBoard from "@/components/map/planner-sidebar/MapPlannerBoard.vue";
import Swal from "sweetalert2";
import OpenAI from "openai";

// Define props
const props = defineProps({
  attraction: Object,
  plannerData: Object,
});

// Define emits
const emit = defineEmits(["set-marker-polyline"]);
const setMarkerPolyline = (plannerList) => {
  (plans.value = plannerList), emit("set-marker-polyline", plannerList);
};

// Reactive state
const route = useRoute();
const useStore = useUserStore();

const isOneday = ref(false);
const startDate = ref();
const endDate = ref();
const travelDate = ref();
const plannerTitle = ref();
const plannerVisible = ref(false);
const getTravelDate = () => {
  travelDate.value =
    Math.abs(new Date(endDate.value).getTime() - new Date(startDate.value).getTime()) /
      (1000 * 60 * 60 * 24) +
    1;
};

const plans = ref([]);
const param = ref({
  userId: useStore.userInfo.userId,
  plannerSDate: startDate,
  plannerEDate: endDate,
  plannerTitle: plannerTitle,
  plannerVisible: plannerVisible,
  plannerPlans: [],
});

function savePlanner() {
  let index = 0;
  plans.value.forEach((element) => {
    element.attractions.forEach((subElements) => {
      param.value.plannerPlans.push({
        planDate: element.arrayIndex,
        attractionContentId: subElements.attraction.contentId,
        attractionOrder: index++,
      });
    });
  });

  createPlanner(
    param.value,
    () => {
      Swal.fire({
        title: "플래너가 성공적으로 저장되었습니다!!",
        text: "Have a Nice Trip",
        icon: "success",
      });
      param.value.plannerPlans = [];
    },
    (error) => {
      console.log(error);
    }
  );
}

function getOne() {
  getPlanner(
    route.params.id,
    ({ data }) => {
      initVariable(data);
    },
    (error) => {
      console.log(error);
    }
  );
}

const plannerData = ref([]);
function initVariable(data) {
  startDate.value = data.plannerSDate;
  endDate.value = data.plannerEDate;
  plannerTitle.value = data.plannerTitle;
  plannerVisible.value = data.plannerVisible;

  getTravelDate();
  plannerData.value = Array(travelDate.value);
  for (var i = 0; i < plannerData.value.length; i++) {
    plannerData.value[i] = {};
    plannerData.value[i].arrayIndex = i;
    plannerData.value[i].attractions = [];
  }

  data.plannerPlans.forEach((e) => {
    selectAttraction(
      e.attractionContentId,
      ({ data }) => {
        plannerData.value[e.planDate].attractions.push({
          attraction: data,
          number: e.attractionOrder,
          index: e.planDate,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  });
}

watch([startDate, endDate, isOneday], () => {
  if (startDate.value != null && endDate.value != null) {
    getTravelDate();
  }

  if (isOneday.value && startDate.value != null) {
    endDate.value = startDate.value;
    getTravelDate();
  }
});

onMounted(() => {
  if (route.params.id > 0) {
    getOne();
  }
});

const getGPTResponse = async () => {
  try {
    const openai = new OpenAI({
      apiKey: `${import.meta.env.VITE_OPENAI_API_KEY}`,
      dangerouslyAllowBrowser: true,
    });

    let prompt = ``;
    prompt += `${useStore.userInfo.userNickName} 님의 `;
    prompt += "창의적이고 재밌는 여행 플래너 제목 하나만 출력해줘. 제목만 대답해!";
    prompt += `${useStore.userInfo.userNickName} 가 제목에 들어가게 해줘! ""는 없애고 `;

    // 로딩 알림 표시
    Swal.fire({
      title: "로딩 중...",
      text: "AI가 플래너 제목을 추천 중입니다. 잠시만 기다려주세요.",
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

    Swal.fire({
      title: "AI 플래너 제목 추천입니다!",
      text: response.choices[0].message.content,
      icon: "success",
      showDenyButton: true,
      confirmButtonText: "맘에든다!",
      denyButtonText: `다시 만들어봐..`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("플래너 제목으로 정합니다!", "", "success");
        plannerTitle.value = response.choices[0].message.content;
      } else if (result.isDenied) {
        getGPTResponse();
      }
    });
  } catch (error) {
    console.log("chatGPT: 🚨 에러가 발생했습니다.");
  }
};
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
  />
  <div>
    <div class="absolute z-10 flex" style="height: 85.5vh">
      <!-- planner content start-->
      <div
        class="overflow-x-hidden transition-all duration-700 bg-white border-r-2 border-gray-200 w-72 mostly-customized-scrollbar"
      >
        <div class="flex flex-col items-center">
          <!-- date select start -->
          <div class="px-2 my-2">
            <div
              @click="getGPTResponse()"
              class="flex flex-row items-center p-1 cursor-pointer hover:scale-105"
            >
              <img src="@/assets/icons8-ai.gif" class="w-8" alt="" />
              <span>플래너 제목 추천!</span>
            </div>
            <div class="relative h-10 w-full min-w-[200px] mb-4">
              <input
                v-model="plannerTitle"
                class="peer h-full w-full rounded-[7px] border border-main-color border-t-transparent bg-transparent px-3 py-2.5 font-normal text-main-color outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-main-color placeholder-shown:border-t-main-color focus:border-4 focus:border-main-color focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-main-color"
                placeholder=" "
              />
              <label
                class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-main-color transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-main-color before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-main-color after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-main-color peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-main-color peer-focus:before:border-t-4 peer-focus:before:border-l-4 peer-focus:before:border-main-color peer-focus:after:border-t-4 peer-focus:after:border-r-4 peer-focus:after:border-main-color peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-main-color"
              >
                플래너 제목
              </label>
            </div>

            <div class="flex justify-between pb-1 border-b-2 border-main-color">
              <button
                @click="savePlanner"
                class="px-4 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
              >
                Save
              </button>
              <div>
                <label for="oneDay" class="mx-2">하루 여행</label>
                <input
                  type="checkbox"
                  id="oneDay"
                  name="oneDay"
                  class="accent-blue-500"
                  @click="isOneday = !isOneday"
                />
              </div>
            </div>
            <div class="border-b-2 border-main-color">
              <table>
                <tr>
                  <td class="p-2">Start Date</td>
                  <td>
                    <input type="date" v-model="startDate" class="w-full p-2" :max="endDate" />
                  </td>
                </tr>
                <tr v-if="!isOneday" class="border-t-2">
                  <td class="p-2">End Date</td>
                  <td>
                    <input type="date" v-model="endDate" class="w-full p-2" :min="startDate" />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <!-- date select end -->
          <!-- attraction planner start -->
          <div>
            <MapPlannerBoard
              :addedAttraction="attraction"
              :travelDate="travelDate"
              :plannerData="plannerData"
              @setMarkerPolyline="setMarkerPolyline"
            ></MapPlannerBoard>
          </div>
          <!-- attraction planner end -->
        </div>
      </div>
    </div>
    <!-- planner content end-->
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
  height: 8px;
  background-color: #fff;
  /* or add it to the track */
}

/* Add a thumb */
.mostly-customized-scrollbar::-webkit-scrollbar-thumb {
  background: #2e3a65;
}
</style>
