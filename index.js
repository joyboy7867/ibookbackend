const connecttomongo=require('./db');
const cors=require('cors')
connecttomongo();
const express = require('express')
const app = express()
const port = 5000
//routes:
// const express=require('express')
// const app=express()
// const mongoose=require('mongoose')
// const mongodb="mongodb://localhost:27017/user";
// mongoose.connect('mongodb://127.0.0.1:27017/').then(()=>{console.log("coneected")}).catch((e)=>{console.log("not connected")})
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
