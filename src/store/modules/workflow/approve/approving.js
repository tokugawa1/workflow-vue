import {
  approvingList,
  turnPersonList,
  turnTask,
  nextNode,
  taskNextNode,
  taskNextPerson,
  commit,
  backList
} from '@/api/workflow/approve/approving'

const state = {
  list: {} // 代办配置数据
  turnPersonList: [] // 转办人员列表
}

const mutations = {
  setData: (state, data) => {
    state.list = data
  },
  turnPerson: (state, data) => {
    state.turnPersonList = data
  }
}

const actions = {
  // user login
  getList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      approvingList(payload).then(response => {
        console.log(response)
        commit('setData', response.ResponseBody)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getturnPersonList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      turnPersonList(payload).then(response => {
        console.log(response)
        commit('turnPerson', response.ResponseBody.RetList)
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

