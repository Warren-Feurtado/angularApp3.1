const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// //MONGOOSE CONNECTION
// mongoose.connect('mongodb://127.0.0.1:27017/....')
// .then((x) => {
//     console.log(`Connected to MongoDB Successfully! Database Name: "${x.connections[0].name}"`);
// })
// .catch((err) => {
//     console.log(`Error while connecting MongoDB`, err.reason);
// });

//EXPRESS APP
const app = express();
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(cors());

//create a variable to point to the JSON Data File
const DATA_FILE = `${__dirname}/data/data.json`;

//Read the Data from the file system
const students = JSON.parse(
    //We can use readFileSync() here because it is not inside a Callback Function's event  loop so we can use a synchronous method.
    fs.readFileSync(DATA_FILE)
);


//Routes
app.get('/api/v1/students', (req, res) => {
    res.status(200).json({
        status: '200', 
        results: students.length,
        data: {
            students
        }
    }
    );
});

app.post('/', (req, res) => {
    // console.log(req.body);
    // res.status(201).json({status: '201', message: 'Successfully created Document!', data: { body: req.body}});
    const newId = students[students.length - 1].id +1;
    const newStudent = Object.assign({id: newId}, req.body);
});

// app.get('/', (req, res) => {
//     res.status(200).json({status: '200', message: 'Welcome to Express!'}
//     );
// });

// app.post('/', (req, res) => {
//     console.log(req.body);
//     res.status(201).json({status: '201', message: 'Successfully created Document!', data: { body: req.body}});
// });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on Port: ${port}..`));