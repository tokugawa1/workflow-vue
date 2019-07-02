import {
  dictionaryList,
  dicTypeList,
  addList,
  deleteList
} from '@/api/workflow/system/dictionary'

const state = {
  list: {}, // 代办配置数据,
  sysList: [] // 数据字典列表
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
  // 初始化列表
  getList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      dictionaryList(payload).then(response => {
        console.log(response)
        commit('setData', response.ResponseBody)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询数据字典
  getSys({ commit }, payload) {
    return new Promise((resolve, reject) => {
      dicTypeList(payload).then(response => {
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

