import express from 'express'
import { changePassword, forgotPassword, me, resetPassword, signIn, signOut, signUp, verifyCode } from '../controllers/auth.controller.js';
import {protectRoute} from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/signup' , signUp);
router.post('/signin' , signIn);
router.get('/signout' , signOut);
router.get('/me' , protectRoute , me)

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/change-password' , changePassword)
router.post('/verify-code' , verifyCode)

export default router;