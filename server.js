const express = require('express');
const app = express();
const mongoose = require('mongoose');


app.use(express.json());

mongoose.connect('mongodb://localhost:27017/learn', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});

// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   });


// app.post('/Register', async (req, res) => {
//     const {username, email, password} = req.body;
//     if (!username || !email || !password) {
//         return res.status(400).json({ message: 'All fields are required.' });
//     }
//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Email already in use.' });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         // create new user
//         const newUser = new User({ username, email, password: hashedPassword });
//         await newUser.save();
//         return res.status(201).json({ message: 'User registered successfully.' });
//     }
//     catch (error) {
//         console.error('Registration error:', error);
//         return res.status(500).json({ message: 'Server error. Please try again later.' });
//     }
// });




// app.post('/Login', async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({message: 'All fields are required.'});

//     }

//     try {
//         const user = await User.findOne({email});
//         if (!user){
//             return res.status(400).json({message: 'Invalid credentials.'});
//         }

//         const isPasswordMatch = await bcrypt.compare(password,user.password);
//         if (!isPasswordMatch){ 
//             return res.status(400).json({message: 'Invalid credentials.'});
//         }

//         // Generate a JWT token (optional but recommended for authentication)
//         const token = jwt.sign({ id: user._id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

//         return res.status(200).json({message: 'Login successful.'});

//     } catch (error) {
//         console.error('Login error:', error);
//         return res.status(500).json({message: 'Server error. Please try again later.'});
//     }
// });

app.listen(3000, () => {
    console.log('Server running on port 3000');
});