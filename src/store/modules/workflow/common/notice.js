import { getNotice } from '@/api/workflow/common/notice'

const state = {
  list: [] // 所属系统数据
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
      getNotice(payload).then(response => {
        commit('setData', response.ResponseBody.RetList)
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

