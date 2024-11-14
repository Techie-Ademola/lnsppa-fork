import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userId: sessionStorage.getItem('userId') || null,
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId
    sessionStorage.setItem('userId', userId)
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { email, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password: password })
        .then(response => {
          if (response.data && response.data.status === "success") {
            const token = response.data.data.token;
            const userId = response.data.data.user.id;

            commit('SET_TOKEN', token);
            commit('SET_USER_ID', userId);

            setToken(token);
            resolve();
          } else {
            reject(new Error(response.data.message || "Login failed."));
          }
        })
        .catch(error => {
          console.error("Error in login action:", error.message || error);
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (!state.userId) {
        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
          commit('SET_USER_ID', storedUserId);
        }
      }

      getInfo(state.token, state.userId)
        .then(response => {
          const { data } = response;
          if (!data.data || !data.data.user || !data.data.user.roles || data.data.user.roles.length === 0) {
            return reject('Verification failed, please Login again.');
          }

          const userRole = data.data.user.roles[0];
          const permissions = userRole ? userRole.permissions.map(permission => permission.name) : [];
          const fullName = userRole.name;

          if (!permissions || permissions.length === 0) {
            return reject('getInfo: role must be a non-null array!');
          }

          commit('SET_ROLES', permissions);
          commit('SET_NAME', fullName);
          resolve(response);
        })
        .catch(error => {
          console.error("Error in getInfo action:", error.message || error);
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        sessionStorage.removeItem('userId')
        removeToken()
        resetRouter()

        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      sessionStorage.removeItem('userId')
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    router.addRoutes(accessRoutes)

    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
