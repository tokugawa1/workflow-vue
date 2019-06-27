import request from '@/utils/request'

export function finishApproveList(data) {
  return request({
    url: '/finishapprove/list',
    method: 'POST',
    data
  })
}

export function finishcommentList(data) {
  return request({
    url: '/approve/approve-comment',
    method: 'POST',
    data
  })
}
