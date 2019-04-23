import request from '@/utils/request'

//获取杂志书展信息
export function getJournalFairs(pageNum, pageSize,isDelete,overdue) {
  return request({
    url: '/jm-fair/journal-fair/fairinfos',
    method: 'get',
    params:{pageNum, pageSize,isDelete,overdue}
  })
}

//获取杂志信息
export function getJournalds() {
  return request({
    url: '/jm-fair/journal-fair//fair-journals',
    method: 'get',
  })
}

//创建杂志书展信息
export function createJournalFairs(fairInformation, token) {
  return request({
    url: '/jm-fair/journal-fair/insert/fair-info',
    method: 'post',
    data:{fairInformation, token}
  })
}

//更新杂志书展信息
export function updateJournalFairs(fairInformation) {
  return request({
    url: '/jm-fair/journal-fair/update-fair',
    method: 'put',
    data:{fairInformation}
  })
}

//删除杂志书展信息
export function delJournalFairs(fairInformationId,delType,delIds) {
  return request({
    url: '/jm-fair/journal-fair/del-fair',
    method: 'delete',
    data:{fairInformationId,delType,delIds}
  })
}