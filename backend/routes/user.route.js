import express from 'express'
import { getUsersForSideBar } from '../controllers/user.controller.js';
import {protectRoute} from '../middlewares/auth.middleware.js'

const router = express.Router();

router.get('/' , protectRoute , getUsersForSideBar)

export default router;