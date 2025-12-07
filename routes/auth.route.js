import {Router} from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controller.js';

const authRouter = Router();

// Route 1: sign-up
authRouter.post("/sign-up", signUp); 

// Route 2: sign-in
authRouter.post("/sign-in", signIn); 

// Route 3: sign-out
authRouter.post("/sign-out", signOut); 
export default authRouter;
