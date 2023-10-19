import express from 'express'
import connection from '../utils/db.js'

const router = express.Router()

// 获取留言信息
router.get('/admin/index/message', (req, res) => {
  connection.query('SELECT * FROM message', (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
      return
    }
    res.json(results)
  })
})

// 提交留言信息
router.post('/admin/index/message', (req, res) => {
  const messageContent = req.body.messageContent
  connection.query(
    'INSERT INTO message (messageContent) VALUES (?)',
    [messageContent],
    (err, results) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
        return
      }
      res.json(results)
    }
  )
})

// 回复留言
router.post('/admin/index/message/reply', (req, res) => {
  const message = req.body
  connection.query(
    'UPDATE message SET messageContent=?, messageRes=? WHERE messageId = ?',
    [message.messageContent, message.messageRes, message.messageId],
    (err, results) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
        return
      }
      res.json(results)
    }
  )
})

// 删除留言
router.delete('/admin/index/message/:id', (req, res) => {
  const messageId = req.params.id
  connection.query(
    'DELETE FROM message WHERE messageId = ?',
    [messageId],
    (err, results) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
        return
      }
      res.json(results)
    }
  )
})

export default router
