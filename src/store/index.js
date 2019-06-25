import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'
import agentconfig from './modules/workflow/system/agentconfig'
import chooseSys from './modules/workflow/common/chooseSys'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    settings,
    user,
    agentconfig,
    chooseSys
  },
  getters
})

export default store
