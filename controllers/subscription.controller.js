import Subscription from '../models/subscription.model.js';


export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json({ success: true, data: subscription })
  }
  catch (err) {
    console.error(err);
    next(err);
  }
  
};

export const getSubscriptions = async ( req , res , next ) => {
  
  try {
    if(req.user.id !== req.params.id)
      {
        const error = new Error('You are not authorized to access this resource');
        error.status = 403;
        throw error;
      }
    const subscriptions = await Subscription.find({ user: req.params._id });
    res.status(200).json({ success: true, data: subscriptions });
  }
  catch (err) {
    console.error(err);
    next(err);
  }
}