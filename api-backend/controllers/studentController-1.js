const express = require('express');
const student = require('../models/studentModel');


exports.getAllStudents = async(req, res) => {
  const students = await Student.find();
  res.status(200).json({
    status: 'success',
    results: students.length,
    data: {
      students
    }
  });
}

exports.checkStudentID = (req, res, next, val) =>{
  if(req.params.id * 1 > students.length){
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
}

exports.checkData = (req, res, next) =>{
  if(!(Object.keys(req.body).hasOwnProperty("name") && !Object.keys.hasOwnProperty("email"))){
    return res.status(404).json({
      status: 'fail',
      message: 'Name and Email are missing'
    });
  }
  next();
}

// exports.getAllStudents = (req, res) =>{
//   res.status(200).json({
//       status: 'success',
//       results: students.length,
//       data: {
//         students
//       }
//   });
// }

exports.createAdvanceStudent = (req, res) =>{

  res.status(201).json({
        status: 'success',
        // data: {
        //   student
        // }
      })

}

exports.getStudentByIdEx2 = (req, res) =>{
    res.status(200).json({
        status: 'success',
        data: {
          student
        }
    }); 
}
exports.updateStudent = (req, res) =>{
   res.status(200).json({
    status: 'success',
    data:{
      student: '[The Updated Student Here]'
    }
  });
}
exports.updateStudent2 = (req, res) =>{
//
}
exports.deleteStudent =  (req, res) =>{
  // if(req.params.id * 1 > students.length){
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID'
  //   });
  // }
  //Can also be 204 if you are not returning anything in the response
  res.status(200).json({
    status: 'success',
    data:{
      student: '[]'
    }
  });
}