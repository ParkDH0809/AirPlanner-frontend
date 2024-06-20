<script setup>
import { KakaoMap, KakaoMapMarker, KakaoMapMarkerPolyline } from "vue3-kakao-maps";
import { ref, watch } from "vue";

const props = defineProps(["attraction", "attractions", "plannerList"]);
const emit = defineEmits(["attraction-info"]);

const coordinate = { lat: 37.57607255, lng: 126.9768042 };
const isVisible = ref([]);
const searchedAttractions = ref([]);

watch(props, () => {
  if (props.attraction.latitude != null) {
    moveMapCenter();
  }

  if (props.attractions != null) {
    setMapMarker();
  }

  if (props.plannerList && props.plannerList.length != 0) {
    setMapMarkerPolyline();
  }
})

function moveMapCenter() {
  coordinate.lat = props.attraction.latitude;
  coordinate.lng = props.attraction.longitude;
}

function setMapMarker() {
  searchedAttractions.value = props.attractions;
  addIndexNumberPerAttraction();
}

function addIndexNumberPerAttraction() {
  let number = 0;
  searchedAttractions.value.forEach((attraction) => {
    isVisible.value[number] = false;
    attraction.index = number++;
    if (isSelectedAttraction(attraction)) {
      isVisible.value[attraction.index] = true;
    }
  });
}

function isSelectedAttraction(attraction) {
  return props.attraction.contentId == attraction.contentId;
}

const onClickKakaoMapMarker = (attraction) => {
  isVisible.value[attraction.index] = !isVisible.value[attraction.index];
};

function emitAttractionInfo(attraction) {
  emit("attraction-info", attraction);
}

function getContent(attraction) {
  // 컨테이너 div 생성
  const container = document.createElement("div");
  container.style.padding = "10px";
  container.style.backgroundColor = "white";
  container.style.border = "1px solid #ccc";
  container.style.borderRadius = "5px";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "flex-start";

  // 제목 div 생성
  const title = document.createElement("div");
  title.style.fontWeight = "bold";
  title.style.marginBottom = "5px";
  title.textContent = attraction.title;

  // 주소 div 생성
  const addr1 = document.createElement("div");
  addr1.style.overflow = "hidden";
  addr1.style.textOverflow = "ellipsis";
  addr1.style.whiteSpace = "nowrap";
  addr1.textContent = attraction.addr1;

  // 정보보기 버튼 생성
  const button = document.createElement("button");
  button.textContent = "정보보기";
  button.onclick = () => emitAttractionInfo(attraction);

  // 추가 정보 div 생성
  const infoContainer = document.createElement("div");
  infoContainer.style.display = "flex";
  infoContainer.style.flexDirection = "column";
  infoContainer.style.alignItems = "flex-start";

  // 주소와 버튼 추가
  infoContainer.appendChild(addr1);
  infoContainer.appendChild(button);

  // 컨테이너에 요소들 추가
  container.appendChild(title);
  container.appendChild(infoContainer);

  // HTML 문자열 반환
  return container;
}

const markerAttractions = ref([]);
const colors = ["#FF0000", "#FFA500", "#FFFF00", "#008000", "#0000FF", "#4B0082", "#EE82EE"];
function setMapMarkerPolyline() {
  // markerAttractions 배열 길이를 props.plannerList 배열 길이에 맞추기
  while (markerAttractions.value.length < props.plannerList.length) {
    markerAttractions.value.push({ attraction: ref([]), color: ref() });
  }

  // props.plannerList를 순회하면서 markerAttractions 배열을 채우기
  for (let i = 0; i < props.plannerList.length; i++) {
    markerAttractions.value[i].color = colors[i % colors.length];
    // markerAttractions[i].attraction 배열 길이를 props.plannerList[i].attractions 배열 길이에 맞추기
    while (markerAttractions.value[i].attraction.length < props.plannerList[i].attractions.length) {
      markerAttractions.value[i].attraction.push({ lat: "", lng: "" });
    }

    while (markerAttractions.value[i].attraction.length > props.plannerList[i].attractions.length) {
      markerAttractions.value[i].attraction.pop();
    }

    for (let j = 0; j < props.plannerList[i].attractions.length; j++) {
      markerAttractions.value[i].attraction[j].lat =
        props.plannerList[i].attractions[j].attraction.latitude;
      markerAttractions.value[i].attraction[j].lng =
        props.plannerList[i].attractions[j].attraction.longitude;
    }
  }
}
</script>

<template>
  <div>
    <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true" style="width: 100%; height: 85.5vh">
      <KakaoMapMarker v-for="attraction in searchedAttractions" :key="attraction.contentId" :lat="attraction.latitude"
        :lng="attraction.longitude"
        :infoWindow="{ content: getContent(attraction), visible: isVisible[attraction.index] }" :clickable="true"
        @onClickKakaoMapMarker="onClickKakaoMapMarker(attraction)"></KakaoMapMarker>

      <template v-for="attractions in markerAttractions">
        <KakaoMapMarkerPolyline :markerList="attractions.attraction" :strokeColor="attractions.color" />
      </template>
    </KakaoMap>
  </div>
</template>

<style scoped></style>
