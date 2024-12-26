import dbConnect from '@/utils/database';
import User from '@/models/User';


export default async function handler(req, res){
    if (req.method !== 'GET'){
        return res.status(405).json({ message: 'Method not allowed' });
    }
    

    try {
        const email = req.query.email;
        await dbConnect();
        const user = await User.findOne({ email: email }).lean();
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
}
