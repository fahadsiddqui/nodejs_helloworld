import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mysql from 'mysql';


var connection = mysql.createConnection({
    host     : '',
    user     : '',
    password : '',
    database : ''
  });

//   connection.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
   
//     console.log('connected as id ' + connection.threadId);
//   });


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(morgan('short'));


connection.connect(function(err) {
    if (err) throw err;
  });

  app.get('/customer/:id' , (req, res) => {
    connection.query('SELECT * FROM core_customer WHERE customer_id = ?',[req.params.id], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );


app.listen(port,()=>{
    console.log("server is running");
  })