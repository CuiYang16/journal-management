import request from '@/utils/request'

export function login(userLogin) {
  return request({
    url: '/jm-user/user/login',
    method: 'post',
    data:{userLogin}
  })
}

export function getInfo(token) {
  return request({
    url: '/jm-user/user/get-info',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/jm-user/user/logout',
    method: 'post',
    data:{token}
  })
}

