import request from '@/utils/request'

//获取杂志信息
export function getJournals(pageNum, pageSize) {
  return request({
    url: '/jm-journal/journal-detail/get-journals',
    method: 'get',
    params:{pageNum, pageSize}
  })
}

//获取杂志信息根据id
export function getJournal(journalId) {
  return request({
    url: '/jm-journal/journal-detail/get-journal',
    method: 'get',
    params:{
      journalId
    }
  })
}
//获取imgurl根据id
export function getImgUrl(journalId) {
  return request({
    url: '/jm-journal/journal-detail/get-img',
    method: 'get',
    params:{
      journalId
    }
  })
}
//创建杂志信息
export function createJournals(journalDetails) {
  return request({
    url: '/jm-journal/journal-detail/insert-journals',
    method: 'post',
    data:{
      journalDetails
    }
  })
}
//编辑杂志信息
export function updateJournals(journalDetails) {
  return request({
    url: '/jm-journal/journal-detail/update-journals',
    method: 'put',
    data:{
      journalDetails
    }
  })
}

//假删除杂志信息
export function delJournal(journalId) {
  return request({
    url: '/jm-journal/journal-detail/del-journal',
    method: 'put',
    data:{
      journalId
    }
  })
}
//真删除杂志信息
export function delJournalTrue(journalId) {
  return request({
    url: '/jm-journal/journal-detail/del-journals',
    method: 'delete',
    data:{
      journalId
    }
  })
}

//假批量删除杂志信息
export function delMulJournal(delIds) {
  return request({
    url: '/jm-journal/journal-detail/del-mul-journal',
    method: 'put',
    data:{
      delIds
    }
  })
}

//真批量删除杂志信息
export function delMulJournalTrue(delIds) {
  return request({
    url: '/jm-journal/journal-detail/del-mul-journals',
    method: 'delete',
    data:{
      delIds
    }
  })
}
// 获取类别信息(前两层)
export function getJournalType() {
  return request({
    url: '/jm-journal/journal-type/get-type',
    method: 'get'
  })
}
// 获取类别信息
export function getAllJournalType() {
  return request({
    url: '/jm-journal/journal-type/get-alltype',
    method: 'get'
  })
}
//获取类别信息子集
export function getJournalTypeChildren(ids) {
  return request({
    url: '/jm-journal/journal-type/get-type-children',
    method: 'post',
    data:{
      ids
    }
  })
}

//创建类别信息
export function createJournalType(typeId,journalType) {
  return request({
    url: '/jm-journal/journal-type/insert-type',
    method: 'post',
    data:{
      typeId,journalType
    }
  })
}

//更新类别信息
export function updateJournalType(journalType) {
  return request({
    url: '/jm-journal/journal-type/update-type',
    method: 'put',
    data:{
      journalType
    }
  })
}

//删除类别信息
export function deleteJournalType(ids) {
  return request({
    url: '/jm-journal/journal-type/delete-type',
    method: 'delete',
    data:{
      ids
    }
  })
}

//上移类别信息
export function upJournalType(typeId,typeIndex) {
  return request({
    url: '/jm-journal/journal-type/update/toup',
    method: 'put',
    data:{
      typeId,typeIndex
    }
  })
}

//下移类别信息
export function downJournalType(typeId,typeIndex) {
  return request({
    url: '/jm-journal/journal-type/update/todown',
    method: 'put',
    data:{
      typeId,typeIndex
    }
  })
}

//上传封面信息
export function uploadJournalImg(token,journalImage) {
  return request({
    url: 'jm-journal/journal-detail/upload/jounal-img',
    method: 'post',
    data:{
      token,journalImage
    }
  })
}

//获取imgurl根据id
export function getImgs(journalId) {
  return request({
    url: '/jm-journal/journal-detail/get-imgs',
    method: 'get',
    params:{
      journalId
    }
  })
}

// 删除附加图片
export function delImgs(journalId) {
  return request({
    url: '/jm-journal/journal-detail/del-imgs/'+journalId,
    method: 'delete',

  })
}

