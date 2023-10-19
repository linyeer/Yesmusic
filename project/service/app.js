import express from 'express'
import loginRouter from './routers/users.js'
import getusers from './routers/getusers.js'
import getmusics from './routers/getmusics.js'
import getmessages from './routers/getmessages.js'

const app = express()

app.use(express.json())
app.use('/api', loginRouter)
app.use('/api', getusers)
app.use('/api', getmusics)
app.use('/api', getmessages)

app.listen(3000, () => {
  console.log('后端服务启动成功!')
})
