import request from '@/utils/request'

// 获取留言信息
export function getMessages() {
  return request({
    url: '/api/admin/index/message',
    method: 'get'
  })
}

// 提交留言信息
export function postMessage(messageContent) {
  return request({
    url: '/api/admin/index/message',
    method: 'post',
    data: { messageContent }
  })
}

// 回复留言
export function replyMessage(message) {
  return request({
    url: '/api/admin/index/message/reply',
    method: 'post',
    data: message
  })
}

// 删除留言
export function deleteMessage(messageId) {
  return request({
    url: `/api/admin/index/message/${messageId}`,
    method: 'delete'
  })
}
