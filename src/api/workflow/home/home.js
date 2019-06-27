import request from '@/utils/request'

// 首页
export function homeList(data) {
  return request({
    url: '/home/list',
    method: 'POST',
    data
  })
}
