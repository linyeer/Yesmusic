import express from 'express'
import jwt from 'jsonwebtoken' // 引入jsonwebtoken库
import connection from '../../utils/db.js'

const router = express.Router()

router.post('/login', (req, res) => {
  const { userName, userPass } = req.body
  const sql = 'SELECT * FROM user WHERE userName = ? AND userPass = ?'
  connection.query(sql, [userName, userPass], (err, results) => {
    if (err) throw err
    if (results.length > 0) {
      console.log('用户登录成功，用户信息：', results[0])
      // 用户登录成功后，生成一个token
      let soft =
        'XJrxbud2f5jdl7pVo3zTJ921ssgnhjUXQWZo82zil4nXcU4ilU5PG8UnAW46CUqPM1O6HPQmvHPLChDor0LxR034VZvutYijfkgZ'
      const token = jwt.sign({ userName }, soft, { expiresIn: '1h' })
      // 将token发送给客户端
      res.json({ status: 'success', message: '登录成功', token })
    } else {
      res.status(401).json({ status: 'error', message: '用户名或密码错误' })
    }
  })
})

export default router
