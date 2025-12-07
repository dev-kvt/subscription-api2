import {Router} from 'express';
import authorize from '../middleware/auth.middleware.js';
import { getUser , getUsers } from '../controllers/user.controller.js';
const userRouter = Router();


userRouter.get('/' , getUsers);
userRouter.get('/:id' ,authorize, getUser);
userRouter.post('/' , ( req , res ) => { res.send({title:"POST/ USER" })});
userRouter.put('/:id' , ( req , res ) => { res.send({title:"UPDATE/ USER id"})});
userRouter.delete('/:id' , ( req , res ) => { res.send({title:"DELETE/ USER"})});

export default userRouter;
