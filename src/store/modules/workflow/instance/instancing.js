import {
  instancingList,
  commontList,
  deleteList
} from '@/api/workflow/instance/instancing'

const state = {
  list: {}, // 代办配置数据
  commonList: [] // 流转意见列表 
}

const mutations = {
  setData: (state, data) => {
    state.list = data
  },
  commonData: (state, data) => {
    state.commonList = data
  },
}

const actions = {
  // user login
  getList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      instancingList(payload).then(response => {
        console.log(response)
        commit('setData', response.ResponseBody)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 流转意见
  commontList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commontList(payload).then(response => {
        console.log(response)
        commit('commonData', response.ResponseBody.RetList)
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

