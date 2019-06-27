import {
  extendList,
  extendRule,
  initData,
  lastNodeList,
  groupList,
  orgList,
  positionList,
  saveItem
} from '@/api/workflow/define/extend/extend'

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
      extendList(payload).then(response => {
        console.log(response)
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

