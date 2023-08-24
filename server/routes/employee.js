import express from 'express';
import controller from '../controller/EmployeController.js'
import upload from '../middleware/multer.js'
import auth from '../middleware/auth.js';

const router = express.Router();


router.post('/login', controller.login )

router.get('/list', auth, controller.getEmployees)

router.post('/add-employee', auth, upload.single("image"), controller.addEmployees)

router.patch('/edit-employee', auth, upload.single("image"), controller.editEmployees)

router.get('/employee/:id', auth, controller.findEmployeeById)

router.delete('/delete-employee/:id', auth, controller.deleteEmployees)



export default router;