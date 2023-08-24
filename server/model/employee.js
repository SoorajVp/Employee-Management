import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            required: true
        },
        designation: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        course: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },{
        timestamps: true
    }
    
)

const Employee = model("Employee", employeeSchema );
export default Employee; 