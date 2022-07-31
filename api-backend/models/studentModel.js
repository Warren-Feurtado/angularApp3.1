const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Name']
    },
    email: {
        type: String,
        required: [true, 'Your Email is required']
    },
    cohort: String,
    phoneNumber: String,
    grade: Number,
    registrationFee: {
        type: Number,
        required: [true, 'A Student must specify a registration fee'],
        default: '3000'
    },
    accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accounts'
    }]
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;