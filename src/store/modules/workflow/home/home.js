import {
  homeList
} from '@/api/workflow/home/home'

const state = {
  list: {} // 代办配置数据
}

const mutations = {
  setData: (state, data) => {
    state.list = data
  }
}

const actions = {
  // user login
  getList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      homeList(payload).then(response => {
        commit('setData', response.ResponseBody)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

