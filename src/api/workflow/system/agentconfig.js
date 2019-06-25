import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/agentconfig/list',
    method: 'post',
    data
  })
}

