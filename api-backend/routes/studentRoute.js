const express = require('express');
// const { route } = require('../app'); 
const router = express.Router();

// const studentController = require('../controllers/studentController');
const { getAllStudents,
        createAdvanceStudent,
        checkData,
        checkStudentID
      } = require('../controllers/studentController-1');

router.param('id', checkStudentID);
router.param('name', checkData);


router
    .route('/')
    .get(getAllStudents)
    .post(createAdvanceStudent);
router
    .route('/:id')
    .get(studentController.getStudentByIdEx2)
    .patch(studentController.updateStudent)
    .put(studentController.updateStudent2)
    .delete(studentController.deleteStudent);

module.exports = router;