import mysql from 'mysql'
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'Ys_666.',
  database: 'mylibrary'
})

connection.connect((err) => {
  if (err) throw err
  console.log('连接数据库成功')
})

export default connection
