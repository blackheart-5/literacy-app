import bycrypt from 'bcrypt';
import User from '@/models/User.js';
import dbConnect from '@/utils/database.js';

export default async function handler(req,res){
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });//we need POST Method
    }
    try {
        //convert raw request body to json
        const body = JSON.parse(req.body);
        //body.email || body.password
        const {email, password} = body;
        //console.log(email, password);

        if (!email || !password) {
            return res.status(400).json({message:'Provide both email and password.'});
        }

        //console.log('creating user and check');
        await dbConnect();
        let user = await User.findOne({email});
        if (!user){
            return res.status(401).json({message:'User not found.'});
        }

        const isPasswordMatch = await bycrypt.compare(password, user.password);
        if (!isPasswordMatch){
            return res.status(401).json({message:'Invalid password.'});
        }

        return res.status(200).json({success: true, message:'Login successful.'});

    } catch (error) {
        return res.status(500).json({message:'Server error. Please try again later.'});
    }



}