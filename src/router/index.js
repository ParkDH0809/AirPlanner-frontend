import { createRouter, createWebHistory } from "vue-router";
import AppMain from "@/views/AppMain.vue";
import AppPlanner from "@/views/AppPlanner.vue";
import AppMap from "@/views/AppMap.vue";
import AppService from "@/views/AppService.vue";
import UserLogin from "@/views/AppUserLogin.vue";
import UserSignUp from "@/views/AppUserSignUp.vue";
import MyPage from "@/views/AppMyPage.vue";
import ServicePost from "@/components/service/ServicePost.vue";
import ServiceBoardDetail from "@/components/service/ServiceBoardDetail.vue";
import { useUserStore } from "@/stores/user";
import AppAttractionDetail from "@/views/AppAttractionDetail.vue";
import Swal from "sweetalert2";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: AppMain,
      meta: { requiresAuth: false },
    },
    {
      path: "/planner",
      name: "planner",
      component: AppPlanner,
      meta: { requiresAuth: true },
    },
    {
      path: "/planner/:id",
      name: "plannerDetail",
      component: AppPlanner,
      meta: { requiresAuth: true },
    },
    {
      path: "/map",
      name: "map",
      component: AppMap,
      meta: { requiresAuth: false },
    },
    {
      path: "/attraction/detail",
      name: "attractionDetail",
      component: AppAttractionDetail,
      meta: { requiresAuth: false },
    },
    {
      path: "/service",
      name: "service",
      component: AppService,
      meta: { requiresAuth: false },
    },
    {
      path: "/service/:id",
      name: "ServiceBoardDetail",
      component: ServiceBoardDetail,
      meta: { requiresAuth: false },
    },
    {
      path: "/service/post/:boardId",
      name: "ServicePost",
      component: ServicePost,
      meta: { requiresAuth: true },
    },
    {
      path: "/user/login",
      name: "login",
      component: UserLogin,
      meta: { requiresAuth: false },
    },
    {
      path: "/user/signup",
      name: "signup",
      component: UserSignUp,
      meta: { requiresAuth: false },
    },
    {
      path: "/mypage",
      name: "mypage",
      component: MyPage,
      meta: { requiresAuth: true, isFirstVisit: true },
      beforeEnter: async (to, from, next) => {
        try {
          const useStore = useUserStore();
          const { value: password } = await Swal.fire({
            title: "비밀번호를 입력해주세요!!",
            input: "password",
            inputLabel: "Password",
            inputPlaceholder: "비밀번호",
            inputAttributes: {
              maxlength: "10",
              autocapitalize: "off",
              autocorrect: "off",
            },
          });

          if (password === useStore.userInfo.userPassword) {
            await Swal.fire({
              title: "정상적으로 확인 되었습니다.",
              text: "마이페이지로 이동합니다.",
              icon: "success",
            });
            to.meta.isFirstVisit = false;
            next();
          } else {
            await Swal.fire({
              title: "비밀번호가 틀렸습니다.",
              text: "다시 시도해주세요.",
              icon: "error",
            });
            next(false);
          }
        } catch (error) {
          console.error("비밀번호 확인 중 오류 발생:", error);
          next(false);
        }
      },
    },
  ],
});

router.beforeEach(function (to, _, next) {
  const useStore = useUserStore();
  if (!useStore.isLoggedIn) {
    if (to.meta.requiresAuth) {
      Swal.fire({
        title: "회원 전용 기능입니다.",
        text: "로그인 후 이용해주세요.",
        icon: "error",
      });
      next("/user/login");
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
