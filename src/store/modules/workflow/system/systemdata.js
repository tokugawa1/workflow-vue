import {
  systemdataList,
  addList,
  editList
} from '@/api/workflow/system/systemdata'

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
      systemdataList(payload).then(response => {
        console.log(response)
        commit('setData', response.ResponseBody)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增
  addList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      addList(payload).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改
  editList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      editList(payload).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

