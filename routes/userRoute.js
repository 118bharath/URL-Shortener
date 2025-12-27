import express from 'express';
import { handleUserSignUp, handleUserLogin, handleUserLogout } from '../controllers/userController.js';

const router = express.Router();

router.post('/', handleUserSignUp);
router.post('/login', handleUserLogin);
router.get('/logout', handleUserLogout);

export default router;