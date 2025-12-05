import {Router} from 'express';

const authRouter = Router();

// Route 1: sign-up
authRouter.post("/sign-up", (req, res) => {
    res.send({title:"This is a Sign-Up Page"});
}); // <--- FIX: Added closing curly brace (}) and closing parenthesis ())

// Route 2: sign-in
authRouter.post("/sign-in", (req, res) => {
    res.send({title:"This is a Sign-In Page"});
}); // <--- FIX: Added closing curly brace (}) and closing parenthesis ())

// Route 3: sign-out
authRouter.post("/sign-out", (req, res) => {
    res.send({title:"This is a Sign-Out Page"});
}); // <--- FIX: Added closing curly brace (}) and closing parenthesis ())


export default authRouter;
