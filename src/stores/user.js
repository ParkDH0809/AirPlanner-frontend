import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      userId: null,
      userPassword: null,
      userName: null,
      userNickName: null,
      userEmail: null,
      userTel: null,
      userRole: null,
    },
  }),
  getters: {
    isLoggedIn: (state) => {
      return state.userInfo != null;
    },
  },
  actions: {},
});
