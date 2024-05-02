import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;


const rolesEnum = ['Administrator', 'Energy Manager', 'Operator'];

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: rolesEnum,
    required: true,
  }
});

userSchema.methods.generateToken = function(){
  return jwt.sign({id : this._id , role : this.role}, process.env.JWT_SECRET_KEY);
}
const User = mongoose.model('User', userSchema);

export default User;

