import request from '@/utils/request'

export function login(userName, userPass, userRole) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      userName,
      userPass,
      userRole
    }
  })
}

export function register(userName, userPass) {
  return request({
    url: '/api/register',
    method: 'post',
    data: {
      userName,
      userPass
    }
  })
}
