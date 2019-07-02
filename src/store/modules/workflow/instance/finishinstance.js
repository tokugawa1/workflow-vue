import {
  finishInstanceList,
  deleteList
} from '@/api/workflow/instance/finishinstance'

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
      finishInstanceList(payload).then(response => {
        console.log(response)
        commit('setData', response.ResponseBody)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 归档
  deleteList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      deleteList(payload).then(response => {
        resolve(response)
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

