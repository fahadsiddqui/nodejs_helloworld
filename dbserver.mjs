import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';


//mongoose.connect('mongodb+srv://dbfahad:bharmal786@chatbotalcluster.mpfvc.mongodb.net/mychatapp?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://dbfahad:bharmal786@chatbotalcluster.mpfvc.mongodb.net/mychatapp?retryWrites=true&w=majority', function(){
    console.log('mongodb connected')
})

const User =mongoose.model('User',{
    student_name:String,
    father_name:String,
    age:String,
    roll_no:String
});
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json())
app.use(morgan('short'));

app.use((req,res,next)=>{
    console.log("req come ",req.body);
    next();
})

app.get('/users', (req, res) => {
    User.find({}, (err, users) => {
      if (!err) {
        res.send(users)
      } else {
        res.status(500).send("error happened")
      }
    })  
})

  app.post('/user', (req, res) => {

    if (!req.body.student_name || !req.body.father_name || !req.body.age) {
      res.status(400).send("invalid data");
    } else {
      const newUser = new User({
        student_name: req.body.student_name,
        father_name: req.body.father_name,
        age: req.body.age,
        roll_no: req.body.roll_no
      });
      newUser.save().then(() => {
        console.log('user created success')
        res.send("users created");
      });
    }
  })



app.listen(port,()=>{
    console.log('server is running');
})

