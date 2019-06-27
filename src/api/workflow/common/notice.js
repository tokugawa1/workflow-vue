import request from '@/utils/request'

// 查询notice信息
export function getNotice(data) {
  return request({
    url: '/notice-info/list',
    method: 'POST',
    data
  })
}
