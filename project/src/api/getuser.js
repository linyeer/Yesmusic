import request from '@/utils/request'

// 获取用户信息
export function getUsers() {
  return request({
    url: '/api/admin/index/user',
    method: 'get'
  })
}

// 删除用户
export function deleteUser(userId) {
  return request({
    url: `/api/admin/index/user/delete/${userId}`,
    method: 'delete'
  })
}

// 编辑用户信息
export function editUser(user) {
  return request({
    url: '/api/admin/index/user/edit',
    method: 'post',
    data: user
  })
}
