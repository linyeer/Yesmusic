import express from 'express'
import jwt from 'jsonwebtoken'
import connection from '../../utils/db.js'

const router = express.Router()

// 用户登录
router.post('/login', (req, res) => {
  const { userName, userPass, userRole } = req.body

  if (!userRole) {
    // 如果没有选择登录类型，则返回错误提示
    res.json({ success: false, message: '请选择登录类型！' })
    return
  }

  if (userRole === 'user') {
    // 查询用户表
    connection.query(
      'SELECT * FROM user WHERE userName = ? AND userPass = ?',
      [userName, userPass],
      (err, userResults) => {
        if (err) throw err
        if (userResults.length > 0) {
          // 用户登录成功
          console.log('用户登录成功，用户信息：', userResults[0])
          let soft =
            'XJrxbud2f5jdl7pVo3zTJ921ssgnhjUXQWZo82zil4nXcU4ilU5PG8UnAW46CUqPM1O6HPQmvHPLChDor0LxR034VZvutYijfkgZ'
          const token = jwt.sign({ userName }, soft, { expiresIn: '1h' })
          res.json({
            success: true,
            message: '登录成功',
            role: 'user',
            token
          })
        } else {
          // 登录失败，用户名或密码错误
          res.json({ success: false, message: '用户名或密码错误' })
        }
      }
    )
  } else if (userRole === 'admin') {
    // 查询管理员表
    connection.query(
      'SELECT * FROM admin WHERE adminName = ? AND adminPass = ?',
      [userName, userPass],
      (err, adminResults) => {
        if (err) throw err
        if (adminResults.length > 0) {
          // 管理员登录成功
          console.log('管理员登录成功，管理员信息：', adminResults[0])
          let soft =
            'XJrxbud2f5jdl7pVo3zTJ921ssgnhjUXQWZo82zil4nXcU4ilU5PG8UnAW46CUqPM1O6HPQmvHPLChDor0LxR034VZvutYijfkgZ'
          const token = jwt.sign({ userName }, soft, { expiresIn: '1h' })
          res.json({
            success: true,
            message: '登录成功',
            role: 'admin',
            token
          })
        } else {
          // 登录失败，用户名或密码错误
          res.json({ success: false, message: '用户名或密码错误' })
        }
      }
    )
  } else {
    // 登录类型错误
    res.json({ success: false, message: '登录类型错误' })
  }
})

// 用户注册
router.post('/register', (req, res) => {
  const { userName, userPass } = req.body

  const checkSql = `SELECT * FROM user WHERE userName = ?`
  const insertSql = `INSERT INTO user (userName, userPass) VALUES (?, ?)`

  connection.query(checkSql, [userName], (err, results) => {
    if (err) throw err
    if (results.length > 0) {
      res.json({ success: false, message: '该用户名已注册' })
    } else {
      // 如果用户名不存在，将用户信息插入数据库中
      connection.query(
        insertSql,
        [userName, userPass],
        (err, insertResults) => {
          if (err) throw err
          res.json({ success: true, message: '注册成功' })
        }
      )
    }
  })
})

export default router
