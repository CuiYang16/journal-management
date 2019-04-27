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
export function getUsers(pageNum, pageSize) {
  return request({
    url: '/jm-user/user/get-users',
    method: 'get',
    params:{pageNum, pageSize}
  })
}

//获取权限角色
export function getRoles(token) {
  return request({
    url: '/jm-user/user/get-role',
    method: 'get',
    params: { token }
  })
}

