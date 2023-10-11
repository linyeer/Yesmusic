import request from '@/utils/request'

// 获取歌曲信息
export function getMusic() {
  return request({
    url: '/api/admin/index/music',
    method: 'get'
  })
}

// 删除歌曲
export function deleteMusic(mId) {
  return request({
    url: `/api/admin/index/music/delete/${mId}`,
    method: 'delete'
  })
}

// 编辑歌曲信息
export function editMusic(m) {
  return request({
    url: '/api/admin/index/music/edit',
    method: 'post',
    data: m
  })
}

// 添加歌曲
export function addMusic(m) {
  return request({
    url: '/api/admin/index/music/add',
    method: 'post',
    data: m
  })
}
