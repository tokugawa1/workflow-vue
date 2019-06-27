import request from '@/utils/request'

// 查询列表
export function logList(data) {
  return request({
    url: '/log/list',
    method: 'POST',
    data
  })
}
