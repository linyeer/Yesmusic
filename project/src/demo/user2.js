import request from '@/utils/request'

export function login(userName, userPass) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      userName,
      userPass
    }
  })
}
