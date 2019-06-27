import request from '@/utils/request'

export function finishDefineList(data) {
  return request({
    url: '/finishdefine/list',
    method: 'POST',
    data
  })
}

export function recoverList(data) {
  return request({
    url: '/finishdefine/recover',
    method: 'POST',
    data
  })
}
