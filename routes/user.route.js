import {Router} from 'express';

const userRouter = Router();


userRouter.get('/' , ( req , res ) => { res.send({title:"GET/ USER"})});
userRouter.get('/:id' , ( req , res ) => { res.send({title:"GET/ USER id"})});
userRouter.post('/' , ( req , res ) => { res.send({title:"POST/ USER" })});
userRouter.put('/:id' , ( req , res ) => { res.send({title:"UPDATE/ USER id"})});
userRouter.delete('/:id' , ( req , res ) => { res.send({title:"DELETE/ USER"})});

export default userRouter;
