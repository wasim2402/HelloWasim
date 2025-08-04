import mongoose from "mongoose";
import { type } from "os";
import { validators } from "tailwind-merge";

let userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    } ,
    email:{
        type:String,
        email: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return validator.isEmail(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
        required:true
    }, message:{
        type:String,
        required:true
    } 
})

export const ContactModel = mongoose.models.ContactModel || mongoose.model("ContactModel", userSchema);