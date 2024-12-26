import User from '@/models/User';
import dbConnect from '@/utils/database';


export default async function handler(req, res){
    if (req.method !== 'GET'){
        return res.status(405).json({ message: 'Method not allowed' });
    }
    console.log('here');
    try {
        const email = req.query;
        if (!email){
            return res.status(400).json({ message: 'Email is required.' });
        }

        console.log(email);
        await dbConnect();
        const user = await User.findOne({email });
        if (!user){
            return res.status(404).json({ message: 'User not found.' });
        }
        return res.status(200).json(user);
        //return res.status(200).json({ message: 'User retrieved successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
}
