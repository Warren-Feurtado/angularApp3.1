const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const DATA_FILE = `${__dirname}/data/data.json`;

const students = JSON.parse(
  fs.readFileSync(DATA_FILE)
);
/**
 *      R O U T E R    H A N D L E R    M E T H O D S
 */
//Get All Students
const getAllStudents = (req, res) =>{
  res.status(200).json({
      status: 'success',
      results: students.length,
      data: {
        students
      }
  });
}

//Create Simple Student Handler
const createSimpleStudent = (req, res) =>{
  console.log(req.body);
  res.send('done');
}

//Create Student Handler - Advance
const createAdvanceStudent = (req, res) =>{
  const newId = students[students.length - 1].id + 1;
  const newStudent = Object.assign({id: newId}, req.body);
  students.push(newStudent);
  fs.writeFile(DATA_FILE, JSON.stringify(students), err =>{
      res.status(201).json({
        status: 'success',
        data: {
          student: newStudent
        }
      })
  })
}

//Get One student Hangler
const getStudentById = (req, res) =>{
  console.log(req.params);
  res.status(200).json({
      status: 'success',
  });
}

//Get One Student Handler - Multiple Params
const getStudentByIdMultiParams =  (req, res) =>{
  console.log(req.params);
  res.status(200).json({
      status: 'success',

  });
}
//Get One Student Handler - Muliple Params / Optional Params
const getStudentByIdMultiParamsEX = (req, res) =>{
  console.log(req.params);
  res.status(200).json({
      status: 'success',
  });
}
//Get One Student Handler - Final
const getStudentByIdEx = (req, res) =>{
  const varID = req.params.id * 1;
  const student = students.find(item => item.id === varID) ;
    res.status(200).json({
        status: 'success',
        data: {
          student
        }
    });
}

//Get One Student Handler - Final2 / Error Handling
const getStudentByIdEx2 = (req, res) =>{
  console.log(req.params);
   const varID = req.params.id * 1;

  const student = students.find(item => item.id === varID) ;
  if(student !== undefined){
    res.status(200).json({
        status: 'success',
        data: {
          student
        }
    });
  }else{
    res.status(404).json({
      status: 'fail',
      message: 'Record not found. Invalid ID!'
  });
  }
}

// Patch - Update Student Handler
const updateStudent = (req, res) =>{
  if(req.params.id * 1 > students.length){
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(200).json({
    status: 'success',
    data:{
      student: '[The Updated Student Here]'
    }
  });
}

//PUT - Update Student Handler
const updateStudent2 = (req, res) =>{
  //Find record
  //Make changes
  //Save to new Array
  // Write back to FS
}

//DELETE - Delete Student Handler
const deleteStudent =  (req, res) =>{
  if(req.params.id * 1 > students.length){
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  //Can also be 204 if you are not returning anything in the response
  res.status(200).json({
    status: 'success',
    data:{
      student: '[]'
    }
  });
}

/**
 *      *  *  *   R O U T E S    *  *  *
 */
//Get all students route
app.get('/api/v1/students', getAllStudents);
//Create student route (skeleton)
app.post('/api/v1/students1', createSimpleStudent);

//Create student route (Advanced - FS)
app.post('/api/v1/students', createAdvanceStudent);

//Get One Student Route (By ID)
app.get('/api/v1/students/:id1', getStudentById);

//Get One Student Route (By ID) multiple params
app.get('/api/v1/students3/:id/:var/:var2',getStudentByIdMultiParams);

//Get One Student Route (By ID) multiple params / optional params
app.get('/api/v1/students4/:id/:var?/:var2?', getStudentByIdMultiParamsEX);

//Get One Student Route (By ID) - Final1
app.get('/api/v1/students5/:id', getStudentByIdEx);


//Get One Student Route (By ID) - Final / Error Handling
app.get('/api/v1/students6/:id', getStudentByIdEx2);

//PATCH Route
app.patch('/api/v1/students/:id', updateStudent);

//Put requires the entire body
app.put('/api/v1/students/:id', updateStudent2);

//Delete a student
app.delete('/api/v1/students/:id', deleteStudent);

const port = 3000;
app.listen(port, ()=>{
  console.log(`Server Listening on Port ${port}...`);
})
