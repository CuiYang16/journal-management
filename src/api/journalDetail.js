import request from '@/utils/request'

export function getJournals() {
  return request({
    url: '/jm-journal/journal-detail/get-journals',
    method: 'get'
  })
}