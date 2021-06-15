// var express = require('express');
// var mysql = require('mysql');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// var app = express();


// var connection = mysql.createConnection({
//     //properties....
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "doctordb"
// });

// connection.connect(function(error){
//     if(!!error){
//         console.log('Error');
//     }else{
//         console.log("Connected");
//     }
// });

// // this takes the post body
// app.use(express.json({extended: false}));

// app.get('/', (req, res)=> 
// // res.send("Hello World"),
    
//     // // about mysql 
//     connection.query("SELECT * FROM doctor_details", function(error, rows){
//         if(!!error){
//             console.log("Error in the query");
//         }else{
//             console.log("Successfully query");
//             res.send(rows);
            
//         }
//     }),
    
//     );



// app.post("/signup", async (req, res) => {

//     const password = req.body.password;
//     const encryptedPassword = await bcrypt.hash(password, saltRounds)


//     // console.log(first_name);
//     // console.log(email);
//     console.log(encryptedPassword);

//     let details = {
//         "first_name":req.body.first_name,
//         "last_name": req.body.last_name,
//         "age" : req.body.age,
//         "phone_number" : req.body.phone_number,
//         "address" : req.body.address,
//         "gender" : req.body.gender,
//         "working_hospital" : req.body.working_hospital,
//         "experience" : req.body.experience,
//         "specialization" : req.body.specialization,
//         "email" : req.body.email,
//         "password": encryptedPassword
//     }

    
//         // Inserting the data into My SQL Database dynamically using arrya
//         var sql = 'INSERT INTO doctor_details SET ?';
//         // const values = [['null',first_name, last_name, age, phone_number, address, gender, working_hospital, experience, specialization,email, password]];
//         connection.query(sql, details, function(error, result){
//             if(error){
//                 console.log('Failed to Register new User : ', error);
//                 res.sendStatus(500);
//                 return
//             }
//             else{
//             console.log("Inserted new User : ", result.insertId);
//             res.sendStatus(200);
//         }
//             res.end();
            
//         })
//         res.json({ token: "1234567890ghgfh" });
//         res.end();
//         // connection.query(sql, function(error, result){
//         //     if(error) throw error;
//         //     console.log("1 record inserted");
//         // })
// // });
    
//      //check database for email if email say the email is already taken
//     // res.send("Signup api Route")

// });

// app.post("/login", function(req,res){
//     const email = req.body.email;
//     const password = req.body.password;

//     connection.query('SELECT docto_details.*, count(history.useId) AS ')

//     // connection.query("select * from doctor_details where email = ",[email, password],function(error,result,fields){
//     //     if(result.length > 0){
//     //         res.json({msg: "User with this email doesn't exists"})
//     //     }
//     // })

// })



// app.listen(8000,"0.0.0.0",()=>console.log("Example app listening on port 8000"));



require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('../_middleware/error-handle');

app.use(express.urlencoded({extended:false}));
app.use(cors());

// api routes
app.use('/users', require('./users/users.controller'));

// global error Handler
app.unsubscribe(errorHandler);

// start server 
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;
app.listen(port, ()=> console.log('Server listening on port ' + port));