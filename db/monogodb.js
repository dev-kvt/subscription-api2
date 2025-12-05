import mongoose from 'mongoose';

import {DB_URI, NODE_ENV} from '../config/env.js'

const connectDB = async () => 
{

try
{
await mongoose.connect(DB_URI);
console.log(`✅Connected to Database: ${NODE_ENV}`);
}
catch(err)
{
console.error('❌Error Connecting to the Database ', err);
process.exit(1);
}
};

export default connectDB;
