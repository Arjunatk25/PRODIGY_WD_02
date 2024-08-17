
import mongoose from "mongoose";

 const empSchema = mongoose.Schema({
    empName:{
        type: String,
        required : true,
    },
    empRole:{
        type: String,
        required : true,
    },
    empNumber:{
        type: Number,
        required : true,
    },
    empSalary:{
        type: Number,
        required : true,
    }
 },{
    timestamps:true,
 })
export const Employee = mongoose.model('Cat',empSchema);