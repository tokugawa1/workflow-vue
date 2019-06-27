import request from '@/utils/request'

export function finishInstanceList(data) {
  return request({
    url: '/finishinstance/list',
    method: 'POST',
    data
  })
}

// 归档
export function deleteList(data) {
  return request({
    url: '/finishinstance/delete',
    method: 'POST',
    data
  })
}
