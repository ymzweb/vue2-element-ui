import storage from "store";
import { login, getInfo, logout } from "@/api/login";
import { ACCESS_TOKEN } from "@/store/mutation-types";

const user = {
  state: {
    token: "",
    info: {},
    loginShow: false,
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    },
    SET_LOGIN_SHOW: (state, flag) => {
      state.loginShow = flag;
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((response) => {
            const result = response.result;
            storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000);
            commit("SET_TOKEN", result.token);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((response) => {
            const result = response.result;

            if (result.role && result.role.permissions.length > 0) {
              const role = result.role;
              role.permissions = result.role.permissions;
              role.permissions.map((per) => {
                if (
                  per.actionEntitySet != null &&
                  per.actionEntitySet.length > 0
                ) {
                  const action = per.actionEntitySet.map((action) => {
                    return action.action;
                  });
                  per.actionList = action;
                }
              });
              role.permissionList = role.permissions.map((permission) => {
                return permission.permissionId;
              });
              commit("SET_INFO", result);
            } else {
              reject(new Error("getInfo: roles must be a non-null array !"));
            }

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            storage.remove(ACCESS_TOKEN);
            resolve();
          })
          .catch((err) => {
            console.log("logout fail:", err);
            // resolve()
          })
          .finally(() => {});
      });
    },

    ShowLoginModal({ commit, value }) {
      commit("SET_LOGIN_SHOW", value);
    },
  },
};

export default user;
