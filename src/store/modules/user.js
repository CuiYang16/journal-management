import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router, { resetRouter } from "@/router";

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  introduction: "",
  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  // user login
  Login({ commit }, userInfo) {
    const { userName, userPwd } = userInfo;
    return new Promise((resolve, reject) => {
      login({ userName: userName.trim(), userPwd: userPwd })
        .then(response => {
          commit("SET_TOKEN", response.token);
          setToken(response.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { list } = response;

          if (!list) {
            reject("Verification failed, please Login again.");
          }

          // const { roles, name, avatar, introduction } = data

          // roles must be a non-empty array
          if (!list || list.length <= 0) {
            reject("getInfo: roles must be a non-null array!");
          }

          commit("SET_ROLES", list);
          // commit('SET_NAME', name)
          // commit('SET_AVATAR', avatar)
          // commit('SET_INTRODUCTION', introduction)

          resolve(list);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(response => {
          if (response.val == 1) {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resetRouter();
            resolve();
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  },

  // Dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + "-token";

      commit("SET_TOKEN", token);
      setToken(token);

      const { roles } = await dispatch("getInfo");

      resetRouter();

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch("permission/generateRoutes", roles, {
        root: true
      });

      // dynamically add accessible routes
      router.addRoutes(accessRoutes);

      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
