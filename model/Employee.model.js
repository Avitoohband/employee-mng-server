import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    username:{
      type: String, 
      required: true,
      unique: true
    } ,
    name: {type:String},
    department: {type:String},
    position: {type:String}
  },
  { timestamp: true }
);

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
