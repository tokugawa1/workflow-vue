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
  list: {}, // 代办配置数据
  turnPersonList: [], // 转办人员列表
  backNodeList: [], // 退回节点
}

const mutations = {
  setData: (state, data) => {
    state.list = data
  },
  turnPerson: (state, data) => {
    state.turnPersonList = data
  },
  backNode: (state, data) => {
    state.backNodeList = data
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
  // 获取转办人员列表
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
  },
  // 转办保存
  turnList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      turnTask(payload).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取退回节点
  getNextNodeList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      nextNode(payload).then(response => {
        console.log(response)
        commit('backNode', response.ResponseBody.RetList)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 退回
  goback({ commit }, payload) {
    return new Promise((resolve, reject) => {
      backList(payload).then(response => {
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

