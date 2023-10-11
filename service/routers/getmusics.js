import express from 'express'
import connection from '../utils/db.js'

const router = express.Router()

// 获取歌曲信息
router.get('/admin/index/music', (req, res) => {
  connection.query('SELECT * FROM music', (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
      return
    }
    res.json(results)
  })
})

// 删除歌曲
router.delete('/admin/index/music/delete/:mId', (req, res) => {
  const id = req.params.mId
  connection.query('DELETE FROM music WHERE mId = ?', [id], (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
      return
    }
    res.send({ success: true, message: '删除成功' })
  })
})

// 编辑歌曲信息
router.post('/admin/index/music/edit', (req, res) => {
  const music = req.body
  connection.query(
    'UPDATE music SET mName=?,mCate=?,mAlbu=?,mSinger=?,mPopu=?,mDate=?,mText=? WHERE mId = ?',
    [
      music.mName,
      music.mCate,
      music.mAlbu,
      music.mSinger,
      music.mPopu,
      music.mDate,
      music.mText,
      music.mId
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

// 添加歌曲
router.post('/admin/index/music/add', (req, res) => {
  const newMusic = req.body
  connection.query(
    'INSERT INTO music (mName,mCate,mAlbu,mSinger,mPopu,mDate,mText) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      newMusic.mName,
      newMusic.mCate,
      newMusic.mAlbu,
      newMusic.mSinger,
      newMusic.mPopu,
      newMusic.mDate,
      newMusic.mText
    ],
    (err, results) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
        return
      }
      res.send({ success: true, message: '添加成功' })
    }
  )
})

export default router
