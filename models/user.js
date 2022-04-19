import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
//import Joi from "joi";
import jwt from 'jsonwebtoken';



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true, 'name is required'],
        trim: true,
        maxLength: [20, 'name cannot be more than 20 characters']
    },
    email: {
        type: String,
        required:[true, 'email is required....'],
        lowercase: true
    },
    password: {
        type: String,
        required:true,
        min:6,
        max:15,
    },
    balance: {
        type: Number
    },
});

/* pre middleware fn are executed one after another, 
   when each middleware calls #next */
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next()
    this.password = await bcryptjs.hash(this.password, 12)
})

UserSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}




UserSchema.methods.comparePassword = async function (enteredPassword, cb) {
    return bcryptjs.compare(enteredPassword, this.password, function(err, isMatch){
        if(err){
            return cb(err)
        }
        cb(null, isMatch)
    })
}

/**it's not necessary to await for a process inside an async function. 
 * In this case the bcryptjs.compare() is an asynchronous function and
 *  because it takes a standard Node callback, 
 * we can automatically convert to an async/await syntax and 
 * return the promised containing the result. 
 * The consumer of the function will need to await it to get the result out */





const User = mongoose.model('user', UserSchema);
export default User;
