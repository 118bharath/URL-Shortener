const express=require('express');
const {handleUserSignUp,handleUserLogin}=require('../controllers/userController')

const router=express.Router();

router.post('/', handleUserSignUp);
router.post('/login', handleUserLogin);
router

module.exports=router;