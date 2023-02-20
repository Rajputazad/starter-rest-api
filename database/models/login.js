const mongoose = require("mongoose")

const loginSchema = mongoose.Schema({
    email: {
        require: [true, "User Email required"],
        unique: [true, "that Email is taken. try another"],
        type: String

    },
    password: {
        require: [true, "Password  required"],
        type: String
    },
    name:{
        require: [true, "name  required"],
        type:String
    },
    role_id: {
        require: [true, "Role_id  required"],
        type:Number
    },
    verify: {
        require: [true, "verify  required"],
        type:Boolean
    },
    token:[],
    theme:{
        type:String
    }
})

module.exports = mongoose.model("Login_Details", loginSchema)