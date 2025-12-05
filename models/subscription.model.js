Major Rishabh Singh SambyalMajor Rishabh Singh Sambyalimport mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'subscription name is required'],
      minLength: 2,
      maxLength: 100,
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'subscription price is required'],
      min: [0, 'price must be greater than 0']
    },
    currency: {
      type: String,
      enum: ['USD', 'INR', 'GBP', 'KRW', 'JPY'],
      default: 'INR'
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'annually']
    },
    category: {
      type: String,
      enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'others'],
      required: true
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active'
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function(v) {
          return v <= new Date();
        },
        message: 'Start Date must be a date from past'
      }
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function(v) {
          return v > this.startDate;
        },
        message: 'Renewal Date must be after the start date'
      }
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true,
      index:true,
    }
  },
  { timestamps: true }
);
// this happens before each one of the documents is created
// 
// autocalculate the renewal date if missing
subscriptionSchema.pre('save', function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      annually: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }
  //autoupdate the status if date is passed 
  if(this.renewalDate < new Date())
    {
      this.status = 'expired'
    }
  
  next();
  
});
