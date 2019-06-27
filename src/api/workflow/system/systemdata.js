import request from '@/utils/request'
// 查询列表
export function systemdataList(data) {
  return request({
    url: '/systemdata/list',
    method: 'POST',
    data
  })
}

// 新增
export function addList(data) {
  return request({
    url: '/systemdata/add',
    method: 'POST',
    data
  })
}

// 编辑
export function editList(data) {
  return request({
    url: '/systemdata/edit',
    method: 'POST',
    data
  })
}

