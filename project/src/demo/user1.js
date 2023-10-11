import request from '@/utils/request'

export function register(userName, userPass) {
  return request({
    url: '/register',
    method: 'post',
    data: {
      userName,
      userPass
    }
  })
}

// 前端登录函数
export function login(userName, userPass, userRole) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      userName,
      userPass,
      userRole
    }
  })
}
