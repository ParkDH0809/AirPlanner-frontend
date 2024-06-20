<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const routerA = () => {
  router.push({
    name: "attractionDetail",
    state: {
      attraction: {
        contentId: 2470006,
        contentTypeId: 12,
        title: "동대문디자인플라자(DDP)",
        addr1: "서울특별시 중구 을지로 281",
        firstImage:
          "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=0a836c9c-d03b-4bd2-aaaf-677378955ac9.png",
      },
    },
  });
};

const routerB = () => {
  router.push({
    name: "attractionDetail",
    state: {
      attraction: {
        contentId: 126747,
        contentTypeId: 12,
        title: "남산골한옥마을",
        addr1: "서울특별시 중구 퇴계로34길 28",
        firstImage: "http://tong.visitkorea.or.kr/cms/resource/62/1946562_image2_1.jpg",
      },
    },
  });
};
const routerC = () => {
  router.push({
    name: "attractionDetail",
    state: {
      attraction: {
        contentId: 126535,
        contentTypeId: 12,
        title: "남산서울타워",
        addr1: "서울특별시 용산구 남산공원길 105",
        firstImage: "http://tong.visitkorea.or.kr/cms/resource/95/2660695_image2_1.jpg",
      },
    },
  });
};

const routerD = () => {
  router.push({
    name: "attractionDetail",
    state: {
      attraction: {
        contentId: 2611147,
        contentTypeId: 12,
        title: "통영항 꿀빵거리",
        addr1: "경상남도 통영시 중앙동",
        firstImage: "http://tong.visitkorea.or.kr/cms/resource/10/2369210_image2_1.jpg",
      },
    },
  });
};

const routerE = () => {
  router.push({
    name: "attractionDetail",
    state: {
      attraction: {
        contentId: 128164,
        contentTypeId: 12,
        title: "부산광안대교",
        addr1: "부산광역시 해운대구 수영강변대로 203",
        firstImage: "http://tong.visitkorea.or.kr/cms/resource/84/2612484_image2_1.jpg",
      },
    },
  });
};
</script>

<template>
  <div class="mt-56 mb-6 overflow-auto main">
    <div class="flex justify-center mb-24 mr-10">
      <div class="mr-6 text-4xl font-bold text-center text-main-color">Hot Place</div>
      <div class="w-64 mb-4 border-b-4 -mr-52 border-main-color"></div>
    </div>
    <div class="hot-list">
      <div class="hot-area-item area-a" @click="routerA">
        <div>
          <div class="area area-name">동대문디자인플라자(DDP)</div>
          <div class="area">
            <div>가장 매력적인 서울 야경을 볼 수 있는 복합 문화공간</div>
          </div>
          <div class="move-detail">
            <div class="move-detail-link">View Detail</div>
          </div>
        </div>
      </div>
      <div class="hot-area-item area-b" @click="routerB">
        <div>
          <div class="area area-name">남산골 한옥마을</div>
          <div class="area">
            <div>한옥이 보존되어 있는 마을</div>
          </div>
          <div class="move-detail">
            <div class="move-detail-link">View Detail</div>
          </div>
        </div>
      </div>
      <div class="hot-area-item area-c" @click="routerC">
        <div>
          <div class="area area-name">남산서울타워</div>
          <div class="area">
            <div>대를 이어온 데이트의 추억</div>
          </div>
          <div class="move-detail">
            <div class="move-detail-link">View Detail</div>
          </div>
        </div>
      </div>
      <div class="hot-area-item area-d" @click="routerD">
        <div>
          <div class="area area-name">통영항 꿀빵 거리</div>
          <div class="area">
            <div>통영의 대표 간식 ‘통영꿀빵’</div>
          </div>
          <div class="move-detail">
            <div class="move-detail-link">View Detail</div>
          </div>
        </div>
      </div>
      <div class="hot-area-item area-e" @click="routerE">
        <div>
          <div class="area area-name">부산광안대교</div>
          <div class="area">
            <div>어두운 밤하늘과 밤바다를 밝히는 아름다운 야경</div>
          </div>
          <div class="move-detail">
            <div class="move-detail-link">View Detail</div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<style scoped>
@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
}
.main {
  animation: fadeInRight 1s;
}
.hot-list {
  transition: height 0.4s;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.hot-area-item {
  width: 400px;
  height: 300px;
  opacity: 1;
  transition: opacity 1s;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid #edeef2;
  margin: 0 20px;
  cursor: pointer;
  background-repeat: no-repeat;
  object-fit: cover;
  margin: 10px;
}
.hot-area-item:hover {
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  transform: scale(105%);
  z-index: 1;
}
.area-a {
  width: 400px !important;
  height: 250px;
  background-image: url(@/assets/hot-area-1.jpg);
  background-size: cover;
}
.area-a:hover {
  background-image: url(@/assets/hot-area-1-hover.png);
  background-size: cover;
}
.area-b {
  width: 400px !important;
  height: 250px;
  background-image: url(@/assets/hot-area-2.jpg);
  background-size: cover;
}
.area-b:hover {
  background-image: url(@/assets/hot-area-2-hover.png);
  background-size: cover;
}
.area-c {
  width: 400px !important;
  height: 250px;
  background-image: url(@/assets/hot-area-3.jpg);
  background-size: cover;
}
.area-c:hover {
  background-image: url(@/assets/hot-area-3-hover.png);
  background-size: cover;
}
.area-d {
  width: 820px !important;
  height: 250px;
  background-image: url(@/assets/hot-area-4.jpg);
  background-size: cover;
}
.area-d:hover {
  background-image: url(@/assets/hot-area-4-hover.png);
  background-size: cover;
}
.area-e {
  width: 400px !important;
  height: 250px;
  background-image: url(@/assets/hot-area-5.jpg);
  background-size: cover;
}
.area-e:hover {
  background-image: url(@/assets/hot-area-5-hover.png);
  background-size: cover;
}
.hot-area-item:hover .area {
  visibility: hidden;
}
.hot-area-item:hover .move-detail-link {
  visibility: visible;
  z-index: 999;
}

.area-name {
  font-size: 16px;
  font-weight: bold;
}
.hot-area-item > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* height: 70px; */
  font-size: 12px;
  color: white;
  padding: 20px;
  z-index: 99;
}
.hot-area-item > div > div {
  color: white;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  margin: 5px;
}

.move-detail {
  display: flex;
  flex-direction: column;
  margin: 20px auto;
}
.move-detail-link {
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border: 2px solid white;
  margin: 10px auto;
  visibility: hidden;
}
</style>
