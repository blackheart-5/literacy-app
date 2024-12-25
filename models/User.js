import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    }

    // progress:{
    //     type:Map,
    //     of:Number,
    //     default:{},
    // },

    // level:{
    //     type: Number,
    //     default: 1,
    // },
});

// try {
//   // Check if the model already exists, or create a new one
//   const User = mongoose.models.User || mongoose.model('User', UserSchema);
// } catch (error) {
//   console.error('Error creating or retrieving the User model:', error);
// }
// console.log(User);
const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User