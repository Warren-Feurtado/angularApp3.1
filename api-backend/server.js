const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path: './config.env'});

const DB_CONN = process.env.NODE_ENV === 'production' ?
                process.env.DATABASE_PRODUCTION.replace('<PWD>', process.env.DATABASE_PASSWORD): process.env.DATABASE;

mongoose.connect(DB_CONN)
    .then( conn =>{
        console.log('Successfully connected to MongoDB');
    });


// const newStudent = new Student({
//     name: 'Nicolos Smith',
//     email: 'nocolossmith@mail.com',
//     cohort: '2',
//     phoneNumber: '876-4569877',
//     grade: 98,
//     registrationFee: 6500
// })

// newStudent.save().then((doc) => {
//     console.log(doc);
// }).catch((err) =>{
//     console.log(`ERROR: ${err}`);
// });




// 3) START SERVER
const port = 3000;
app.listen(port, ()=>{
  console.log(`Server Listening on Port ${port}...`);
})