import express from 'express';
import { addAdmin, getAdminById, getAllAdmins, login } from '../controllers/adminControllers.js';
const adminRouter = express.Router();

adminRouter.post('/signup',addAdmin);
adminRouter.post('/login',login);
adminRouter.get('/getadmin',getAllAdmins);
adminRouter.get('/:id',getAdminById);

export default adminRouter;