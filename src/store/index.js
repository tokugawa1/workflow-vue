import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'
import agentconfig from './modules/workflow/system/agentconfig'
import chooseSys from './modules/workflow/common/chooseSys'
import user from './modules/user'
import systemdata from './modules/workflow/system/systemdata'
import dictionary from './modules/workflow/system/dictionary'
import log from './modules/workflow/system/log'
import approving from './modules/workflow/approve/approving'
import notice from './modules/workflow/common/notice'
import extend from './modules/workflow/define/extend/extend'
import defining from './modules/workflow/define/defining'
import finishdefine from './modules/workflow/define/finishdefine'
import home from './modules/workflow/home/home'
import finishinstance from './modules/workflow/instance/finishinstance'
import instancing from './modules/workflow/instance/instancing'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    settings,
    user,
    agentconfig,
    chooseSys,
    systemdata,
    dictionary,
    log,
    approving,
    notice,
    extend,
    defining,
    finishdefine,
    home,
    finishinstance,
    instancing
  },
  getters
})

export default store
