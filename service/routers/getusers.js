import express from 'express'
import connection from '../utils/db.js'

const router = express.Router()

// 获取用户信息
router.get('/admin/index/user', (req, res) => {
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
      return
    }
    res.json(results)
  })
})

// 删除用户
router.delete('/admin/index/user/delete/:userId', (req, res) => {
  const id = req.params.userId
  console.log(`删除的ID为: ${id}`)
  connection.query(
    'DELETE FROM user WHERE userId = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
        return
      }
      res.send({ success: true, message: '删除成功' })
    }
  )
})

// 编辑用户信息
router.post('/admin/index/user/edit', (req, res) => {
  const user = req.body
  connection.query(
    'UPDATE user SET userName=?,userPass=?,userAge=?,userSex=?,userBirth=?,userCity=?,userHobby=? WHERE userId = ?',
    [
      user.userName,
      user.userPass,
      user.userAge,
      user.userSex,
      user.userBirth,
      user.userCity,
      user.userHobby,
      user.userId
    ],
    (err, results) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
        return
      }
      res.send({ success: true, message: '修改成功' })
    }
  )
})

export default router
