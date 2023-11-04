
const { Schema, model} = require("mongoose");

const UserSchema = Schema({
    email: {
        type: String,
        required: [true, 'Email is mandatory'],
        unique: true,
    },
    code: {
        type: String,
    },
    state_signup: {
        type: String,
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
    },
    
});

// UserSchema.methods.toJSON = function() {
//     const { __v, password, _id, ...usuario } = this.toObject();
//     usuario.uid = _id;
//     return usuario;
// }

module.exports = model( 'User', UserSchema );