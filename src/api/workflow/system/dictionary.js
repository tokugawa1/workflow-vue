import request from '@/utils/request'

// 查询列表
export function dictionaryList(data) {
  return request({
    url: '/dictionary/list',
    method: 'POST',
    data
  })
}

// 查询字典
export function dicTypeList(data) {
  return request({
    url: '/sys-dic/dic',
    method: 'POST',
    data
  })
}

// 新增
export function addList(data) {
  return request({
    url: '/dictionary/add',
    method: 'POST',
    data
  })
}

// 删除
export function deleteList(data) {
  return request({
    url: '/dictionary/delete',
    method: 'POST',
    data
  })
}

