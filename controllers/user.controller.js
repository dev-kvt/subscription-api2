import User from "../models/user.model.js"
//fetches all users
export const getUsers = async ( req, res , next) => {
  try 
  {
    const users = await User.find(); // all users find
    res.status(200).json({success :true , data : users})
  }
  catch(err)
  {
    next(err);
  }
}
//fetches not all users but a specific one 
export const getUser = async ( req, res , next) => {
  try 
  {
    const user = await User.findById(req.params.id).select('-password');
    if(!user)
      {
      const error = new Error('User Not Found');
      error.statusCode = 404;
      throw error;
      }
    res.status(200).json({success :true , data : user})
  }
  catch(err)
  {
    next(err);
  }
}