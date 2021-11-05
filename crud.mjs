import express from 'express';
import morgan  from 'morgan';
import cors  from 'cors';

const app =express();
app.use(cors());
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
    if(!req.body.student_name || !req.body.father_name || !req.body.age || !req.body.roll_no){
        res.status(400).send('invalid code');        
    }else{
        users.push({
            student_name:req.body.student_name,
            father_name:req.body.father_name,
            age:req.body.age,
            roll_no:req.body.roll_no,            
        })
        res.send("user Created ");        
    }
})

app.put('/user/:id',(req,res)=>{
    if(users[req.params.id]){
        if(req.body.student_name){
            users[req.params.id].student_name = req.body.student_name
        }
        if(req.body.father_name){
            users[req.params.id].father_name = req.body.father_name
        }
        if(req.body.father_name){
            users[req.params.id].age = req.body.father_name
        }
        if(req.body.roll_no){
            users[req.params.id].roll_no = req.body.roll_no
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