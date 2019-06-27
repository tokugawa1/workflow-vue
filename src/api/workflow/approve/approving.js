import request from '@/utils/request'

export function approvingList(data) {
  return request({
    url: '/approving/list',
    method: 'POST',
    data
  })
}

// 转办人员
export function turnPersonList(data) {
  return request({
    url: '/approving/approve-turn-person',
    method: 'POST',
    data
  })
}

// 转办
export function turnTask(data) {
  return request({
    url: '/approving/approve-turn',
    method: 'POST',
    data
  })
}

// 退回节点
export function nextNode(data) {
  return request({
    url: '/approving/approve-back-node',
    method: 'POST',
    data
  })
}

// 审批表单下一节点
export function taskNextNode(data) {
  return request({
    url: '/approving/approve-next-node',
    method: 'POST',
    data
  })
}

// 审批表单下一处理人
export function taskNextPerson(data) {
  return request({
    url: '/approving/approve-next-person',
    method: 'POST',
    data
  })
}

// 提交
export function commit(data) {
  return request({
    url: '/approving/approve-commit',
    method: 'POST',
    data
  })
}

// 退回
export function backList(data) {
  return request({
    url: '/approving/approve-back',
    method: 'POST',
    data
  })
}
