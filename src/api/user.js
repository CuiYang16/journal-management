import request from '@/utils/request'

//登录
export function login(userLogin) {
  return request({
    url: '/jm-user/user/login',
    method: 'post',
    data:{userLogin}
  })
}

//获取权限角色信息
export function getInfo(token) {
  return request({
    url: '/jm-user/user/get-info',
    method: 'get',
    params: { token }
  })
}
//退出登录
export function getUsers(pageNum, pageSize,isDel) {
  return request({
    url: '/jm-user/user/get-users',
    method: 'get',
    params:{pageNum, pageSize,isDel}
  })
}

//获取权限角色
export function getRoles(userId) {
  return request({
    url: '/jm-user/user/get-role',
    method: 'get',
    params: { userId }
  })
}

//获取所有权限角色
export function getAllRoles() {
  return request({
    url: '/jm-user/user/get-roles',
    method: 'get',
  })
}

//创建用户
export function createUser(user) {
  return request({
    url: '/jm-user/user/insert-user',
    method: 'post',
    data:{user}
  })
}

//创建用户
export function validatorUserName(userName) {
  return request({
    url: '/jm-user/user/validator-username',
    method: 'get',
    params:{userName}
  })
}

//重置密码
export function resetUserPwd(userId) {
  return request({
    url: '/jm-user/user/reset-pwd',
    method: 'put',
    data:{userId}
  })
}

//重置密码
export function updateUser(user) {
  return request({
    url: '/jm-user/user/update-user',
    method: 'put',
    data:{user}
  })
}

//去激活
export function delUpdateUser(userId) {
  return request({
    url: '/jm-user/user/update-del',
    method: 'put',
    data:{userId}
  })
}

//删除
export function delUser(userId) {
  return request({
    url: '/jm-user/user/del-user',
    method: 'delete',
    data:{userId}
  })
}

//批量去激活
export function delUpdateMulUser(delIds) {
  return request({
    url: '/jm-user/user/update-muldel',
    method: 'put',
    data:{delIds}
  })
}

//批量删除
export function delMulUser(delIds) {
  return request({
    url: '/jm-user/user/muldel-user',
    method: 'delete',
    data:{delIds}
  })
}

