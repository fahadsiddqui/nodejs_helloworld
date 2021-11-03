import express from 'express';
import morgan  from 'morgan';

const app =express();
const port = process.env.PORT || 3000
let users=[];

app.use(express.json())
app.use(morgan('short'))
// first middleware yaha pay koi bhi type ki request a sakti hi.
app.use((req,res,next)=>{
console.log("a req come",req.body);
next()
})

// get all users//
app.get('/users',(req,res)=>{
res.send(users);
})

app.get('/user/:id',(req,res)=>{
    if(users[req.params.id]){
        res.send(users[req.params.id])
        }else{
            res.send('user not found')
        }
    })


app.post('/user',(req,res)=>{
    if(!req.body.name || !req.body.email || !req.body.address){
        res.status(400).send('invalid code');        
    }else{
        users.push({
            name:req.body.name,
            email:req.body.email,
            address:req.body.address
        })
        res.send("user Created ");        
    }
})

app.put('/user/:id',(req,res)=>{
    if(users[req.params.id]){
        if(req.body.name){
            users[req.params.id].name = req.body.name
        }
        if(req.body.name){
            users[req.params.id].email = req.body.email
        }
        if(req.body.name){
            users[req.params.id].address = req.body.address
        }
        res.send(users[req.params.id])        
    }else{
        res.send('user not found')
    }
})

app.delete('/user/:id',(req,res)=>{
    if(users[req.params.id]){
        users[req.params.id] = {};
        res.send("user deleted");
    }else{
        res.send("user not found")
    }
})

app.listen(port,()=>{
    console.log("server is running")
})