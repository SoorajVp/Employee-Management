import Employee from "../model/employee.js";
import cloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.TOKEN_SECRET
const adminName = process.env.ADMIN_NAME
const adminPassword = process.env.ADMIN_PASSWORD

const credentials = {
    name: adminName,
    password: adminPassword
}

export default {

    login: (req, res) => {
        try {
            if (req.body.name == credentials.name && req.body.password == credentials.password) {
                const token = jwt.sign({ name: req.body.name }, secretKey, { expiresIn: "1d" });
                res.status(201).json({ success: true, message: 'Successfully loggedin', token, name: req.body.name })
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' })
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error, please try again' })
        }
    },

    getEmployees: async (req, res) => {
        try {
            const employees = await Employee.find();
            res.status(200).json({ employees })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error, please try again' })
        }
    },

    findEmployeeById: async (req, res) => {
        try {
            const employee = await Employee.find({_id: req.params.id});
            res.status(200).json({ employee })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error, please try again' })
        }
    },

    addEmployees: async (req, res) => {
        try {
            const isEmailExists = await Employee.findOne({ email: req.body.email });
            if(isEmailExists) {
                res.status(304).json({ success: false, message: 'Email already exists.' })
            }
            const result = await cloudinary.uploader.upload(req.file.path);
            const newEmployee = new Employee({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                designation: req.body.designation,
                gender: req.body.gender,
                course: req.body.course,
                image: result.url,
            })
            await newEmployee.save()
            res.status(201).json({ success: true, message: 'Successfully created' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error, please try again' })
        }
    },

    editEmployees: async (req, res) => {
        try {
            const isEmailExists = await Employee.findOne({ email: req.body.email });
            if (isEmailExists && isEmailExists._id != req.body._id ) {
                res.status(304).json({ success: false, message: 'Email already exists.' })
            }
            const newEmployee = {
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                designation: req.body.designation,
                gender: req.body.gender,
                course: req.body.course,
                image: req.body.image
            }
            await Employee.findByIdAndUpdate({ _id: req.body._id }, newEmployee, { new: true, runValidators: true } )
            res.status(202).json({ success: true, message: 'Updated successfully' })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error, please try again' })
        }
    },

    deleteEmployees: async (req, res) => {
        try {
            await Employee.findByIdAndDelete({_id: req.params.id})
            res.json({ success: true, message: 'Deleted successfully' })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error, please try again' })
        }
    }
}