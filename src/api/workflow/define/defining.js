import request from '@/utils/request'

// 查询列表
export function definingList(data) {
  return request({
    url: '/defining/list',
    method: 'POST',
    data
  })
}

// 查询状态和系统类型
export function statusList(data) {
  return request({
    url: '/sys-dic/dic',
    method: 'POST',
    data
  })
}

// 归档
export function deleteList(data) {
  return request({
    url: '/defining/delete',
    method: 'POST',
    data
  })
}
