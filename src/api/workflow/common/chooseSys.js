import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/choose-system/list',
    method: 'post',
    data
  })
}

