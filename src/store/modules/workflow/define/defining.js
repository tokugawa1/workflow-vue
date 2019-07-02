import {
  definingList,
  statusList,
  deleteList
} from '@/api/workflow/define/defining'

const state = {
  list: {}, // 代办配置数据
  sysList: [] // 数据字典数据
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
  // user login
  getList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      definingList(payload).then(response => {
        console.log(response)
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
      statusList(payload).then(response => {
        console.log(response)
        commit('setSysData', response.ResponseBody.RetList)
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

