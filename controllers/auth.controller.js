import mongoose from 'mongoose';
import { JWT_EXPIRES, JWT_SECRET } from '../config/env.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

export const signUp = async (req, res, next) => {
  // we making signup working here you register here 
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    //planned zone 
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }
    //hash password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //new user 
    const newUser = await User.create([{ name, email, password: hashedPassword, }], { session });

    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: 'User created successfully',
      success: true,
      data: {
        token, user: newUser[0]
      }
    })
  }

  catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err)
  }
};

export const signIn = async(req, res , next)=>{
  try
  {
   const {email , password}  = req.body
   const user = await User.findOne({ email });
   if(!user)
     {
     const error = new Error('User doesnt exist');
     error.statusCode = 404;
     throw error;
     };
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid)
    {
    const error = new Error('Invalid password' );
    error.statusCode =401;
    throw error;
    };
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.status(200).json({
      message: 'User Signed-In successfully',
      success: true,
      data: {
        token, user
      }
    });
  }
  catch(err)
  {
    next(err);
  }
}

export const signOut = async(req, res , next)=>{
  
}


