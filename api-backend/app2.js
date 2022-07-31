// 0) Declarations
const fs = require('fs');
const express = require('express');
const app = express();

// 1) Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Welcome to my custom Middleware!`);
  next();
});

app.use((res, req, next) => {
  console.log(`[ANGULAR-APP3.1] - User Created Middleware!!`);
  next();
});

//Create a variable to point to the JSON Data File
const DATA_FILE = `${__dirname}/data/data.json`;
//Read the Data from the file system
const students = JSON.parse(
  //We can use readFileSync() here because it is not inside a Callback
  // function's event loop so we can use a synchronous method
  fs.readFileSync(DATA_FILE)
);

// 2) Routes
app.get('/api/v1/students',  (req, res) =>{
  res.status(200).json({
      status: 'success',
      results: students.length,
      data: {
        students
      }
  });
});

app.post('/api/v1/students', (req, res) =>{
  // console.log(req.body);
  //Create a variable to hold the new ID for the created record
  const newId = students[students.length - 1].id + 1;
  //Create an object with the new ID and assign it to the req.body
  const newStudent = Object.assign({id: newId}, req.body);
  //Now put the data onto the the existing Array
  students.push(newStudent);
  //Persist/Save the result of this action to the FS
  //we use the Asynchronous Method writeFile. Because we should never ever block the
  //Callback event block, so no Synchronous methods may be used here
  fs.writeFile(DATA_FILE, JSON.stringify(students), err =>{
      //Now send the newly created object as the response
      //Status Code for created is 201
      res.status(201).json({
        status: 'success',
        data: {
          student: newStudent
        }
      })
  })

  // res.send('done');  //Should not send a response twice
  //Cannot set headers after they are sent to the client
});

// 3) Server Config
const port = 3000;
app.listen(port, ()=>{
  console.log(`Server Listening on Port ${port}...`);
})


//https://mongoosejs.com/docs/guide.html
                  