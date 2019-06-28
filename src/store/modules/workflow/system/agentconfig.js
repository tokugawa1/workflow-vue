import {
  getList,
  agentconfigSystem,
  addList,
  editList,
  deleteList
} from '@/api/workflow/system/agentconfig'

const state = {
  list: {}, // 代办配置数据
  sysList: [], // 数据字典返回的值
}

const mutations = {
  setData: (state, data) => {
    state.list = data
  },
  setSysData: (state, data) => {
    state.sysList = data
  }
}

const actions = {
  // 查询列表
  getList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getList(payload).then(response => {
        commit('setData', response.ResponseBody)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询状态和所属系统
  getSys({ commit }, payload) {
    return new Promise((resolve, reject) => {
      agentconfigSystem(payload).then(response => {
        console.log(response)
        commit('setSysData', response.ResponseBody.RetList)
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
  // 删除
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

