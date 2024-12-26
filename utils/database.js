import mongoose from 'mongoose';


const MONGO_URL = 'mongodb+srv://tsekpopa:dSNlqdKcW9XlXWLg@users.zto7k.mongodb.net/?retryWrites=true&w=majority&appName=USERS';

// console.log('MongoDB URL:', process.env.MONGODB_URL);

if (!MONGO_URL) {
        throw new Error('Missing MONGODB_URL environment variable');
    }

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

// async function dbConnect(){

//     try {
//         //console.log('MongoDB URI:', process.env.MONGODB_URL);

//         if (cached.conn) {
//             return cached.conn;
//         }

//         if (!cached.promise) {
//             const opts = {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//             };

//             cached.promise = mongoose.connect(MONGO_URL, opts).then((mongoose) => {
//                 return mongoose;
//             });
//         }

//         cached.conn = await cached.promise;
//         return cached.conn;
//         console.log('MongoDB connected'); //check if connected
//     } catch (error) {
//         console.log(error, 'MongoDB connection not established'); //
//     }
// };


const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // Already connected
  }

  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};


export default dbConnect







