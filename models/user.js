
const { Schema, model} = require("mongoose");

const UserSchema = Schema({
    email: {
        type: String,
        required: [true, 'Email is mandatory'],
        unique: true,
    },
    hashedCode: {
        type: String,
        required: [true, 'hashedCode is mandatory'],
    },
    state_signup: {
        type: String,
        required: [true, 'Signup state is mandatory'],
        // Timeout no necesariamente va a ser un estado, puede calcularse con el date_code
        // enum: ['PENDING_SIGNUP', 'SIGNEDUP', 'TIMEOUT'],
    },
    state_login: {
        type: String,
        // Timeout no necesariamente va a ser un estado, puede calcularse con el date_code
        // enum: ['LOGGED_OUT', 'PENDING_LOGIN', 'LOGGED_IN', 'TIMEOUT'],
    },
    date_code: {
        type: Date,
        required: [true, 'Date of the latest code is mandatory'],
    },
    
});

// UserSchema.methods.toJSON = function() {
//     const { __v, password, _id, ...usuario } = this.toObject();
//     usuario.uid = _id;
//     return usuario;
// }

module.exports = model( 'User', UserSchema );