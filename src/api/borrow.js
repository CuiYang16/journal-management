import request from '@/utils/request'

//获取所有借阅记录信息
export function getBorrows(pageNum, pageSize, userId, isOverdue, isPayment) {
  return request({
    url: '/jm-journal/journal-borrow/get-borrows',
    method: 'get',
    params:{pageNum, pageSize, userId, isOverdue, isPayment}
  })
}

//创建借阅信息
export function createBorrow(userId,journalId) {
  return request({
    url: '/jm-journal/journal-borrow/back-borrow',
    method: 'post',
    data:{userId,journalId}
  })
}

//获取用户信息
export function getUsers() {
  return request({
    url: '/jm-journal/journal-borrow/get-users',
    method: 'get',
  })
}

//获取杂志信息
export function getJournals() {
  return request({
    url: '/jm-journal/journal-borrow/get-journals',
    method: 'get',

  })
}

//归还杂志信息
export function returnJournal(borrow,isPayment) {
  return request({
    url: '/jm-journal/journal-borrow/return-journal',
    method: 'put',
    data:{borrow,isPayment}
  })
}

//缴纳罚金
export function updatePayment(borrowId) {
  return request({
    url: '/jm-journal/journal-borrow/payment',
    method: 'put',
    data:{borrowId}
  })
}

//更新删除状态
export function delUpdate(borrowId) {
  return request({
    url: '/jm-journal/journal-borrow/del-update',
    method: 'put',
    data:{borrowId}
  })
}

//删除
export function delBorrow(borrowId) {
  return request({
    url: '/jm-journal/journal-borrow/del-borrow',
    method: 'delete',
    data:{borrowId}
  })
}

//批量更新删除状态
export function delUpdateMul(delIds) {
  return request({
    url: '/jm-journal/journal-borrow/del-update-mul',
    method: 'put',
    data:{delIds}
  })
}

//批量删除
export function delBorrowMul(delIds) {
  return request({
    url: '/jm-journal/journal-borrow/del-borrow-mul',
    method: 'delete',
    data:{delIds}
  })
}

//借阅统计
export function borrowChart() {
  return request({
    url: '/jm-journal/journal-borrow/get-borrow-chart',
    method: 'get',
  })
}