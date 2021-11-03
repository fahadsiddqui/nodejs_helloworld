import express from 'express'

const app = express();
const port = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.send('iam hello world')
})

app.get('/profile',(req,res)=>{
    res.send('here is your profile')
})

app.listen(port,()=>{
    console.log('server is running')
})