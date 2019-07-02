import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/login-info',
    component: () => import('@/views/login-info/index'),
    hidden: true
  },
  {
    path: '/choosesystem',
    component: () => import('@/views/workflow/chooseSys'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/agentconfig',
    name: 'System',
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'agentconfig',
        name: 'AgentConfig',
        component: () => import('@/views/workflow/system/agentconfig/index'),
        meta: {
          title: '代办配置',
          icon: 'table',
          roles: ['ROL4350701', 'ROL1020398']
        }
      },
      {
        path: 'systemdata',
        name: 'SystemData',
        component: () => import('@/views/workflow/system/systemdata/index'),
        meta: {
          title: '系统参数',
          icon: 'table',
          roles: ['ROL4350701', 'ROL1020398']
        }
      },
      {
        path: 'dictionary',
        name: 'Dictionary',
        component: () => import('@/views/workflow/system/dictionary/index'),
        meta: {
          title: '数据字典',
          icon: 'table',
          roles: ['ROL4350701']
        }
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/workflow/system/log/index'),
        meta: {
          title: '日志监控',
          icon: 'table',
          roles: ['ROL4350701']
        }
      }
    ]
  },
  {
    path: '/define',
    component: Layout,
    redirect: '/define/defining',
    name: 'Define',
    meta: { title: '流程定义', icon: 'example' },
    children: [
      {
        path: 'defining',
        name: 'Defining',
        component: () => import('@/views/workflow/define/defining/index'),
        meta: {
          title: '运行中流程定义列表',
          icon: 'table',
          roles: ['ROL4350701', 'ROL1020398']
        }
      },
      {
        path: 'finishdefine',
        name: 'FinishDefine',
        component: () => import('@/views/workflow/define/finishDefine/index'),
        meta: {
          title: '已结束流程定义列表',
          icon: 'table',
          roles: ['ROL4350701', 'ROL1020398']
        }
      }
    ]
  },
  {
    path: '/instance',
    component: Layout,
    redirect: '/instance/instancing',
    name: 'Instance',
    meta: { title: '流程实例', icon: 'example' },
    children: [
      {
        path: 'instancing',
        name: 'Instancing',
        component: () => import('@/views/workflow/instance/instancing/index'),
        meta: {
          title: '运行中流程实例列表',
          icon: 'table',
          roles: ['ROL4350701', 'ROL1020398']
        }
      },
      {
        path: 'finishinstance',
        name: 'FinishInstance',
        component: () => import('@/views/workflow/instance/finishInstance/index'),
        meta: {
          title: '已结束流程实例列表',
          icon: 'table',
          roles: ['ROL4350701', 'ROL1020398']
        }
      }
    ]
  },
  {
    path: '/task',
    component: Layout,
    redirect: '/task/tasking',
    name: 'Task',
    meta: { title: '任务实例', icon: 'example' },
    children: [
      {
        path: 'tasking',
        name: 'Tasking',
        component: () => import('@/views/workflow/task/index'),
        meta: {
          title: '任务实例列表',
          icon: 'table',
          roles: ['ROL4350701', 'ROL1020398']
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
