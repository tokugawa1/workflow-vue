import request from '@/utils/request'

export function instancingList(data) {
  return request({
    url: '/instancing/list',
    method: 'POST',
    data
  })
}

export function commontList(data) {
  return request({
    url: '/instancing/comment',
    method: 'POST',
    data
  })
}

// 归档
export function deleteList(data) {
  return request({
    url: '/instancing/delete',
    method: 'POST',
    data
  })
}
