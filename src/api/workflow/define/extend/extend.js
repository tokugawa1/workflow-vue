import request from '@/utils/request'

// 流程定义扩展属性节点
export function extendList(data) {
  return request({
    url: '/define/list',
    method: 'POST',
    data
  })
}

// 扩展属性转办规则,机构级别，参与者规则
export function extendRule(data) {
  return request({
    url: '/sys-dic/dic',
    method: 'POST',
    data
  })
}

// 初始化新增扩展属性数据
export function initData(data) {
  return request({
    url: '/define/extend-add-list',
    method: 'POST',
    data
  })
}

// 上一节点
export function lastNodeList(data) {
  return request({
    url: '/define/extend-add-lastnode',
    method: 'POST',
    data
  })
}

// 查询组织
export function groupList(data) {
  return request({
    url: '/define/extend-add-group',
    method: 'POST',
    data
  })
}

// 查询机构
export function orgList(data) {
  return request({
    url: '/define/extend-add-orgtree',
    method: 'POST',
    data
  })
}

// 查询岗位
export function positionList(data) {
  return request({
    url: '/define/extend-add-postree',
    method: 'POST',
    data
  })
}

// 保存
export function saveItem(data) {
  return request({
    url: '/define/extend-add',
    method: 'POST',
    data
  })
}
