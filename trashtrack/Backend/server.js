const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require("path")

const fs = require('fs');
const { exec } = require('child_process');

const directoryToWatch = './uploads'; // Change this to the directory you want to watch
const pythonScript = 'garbage.py'; // Change this to the name of your Python script

// Function to watch for changes in the directory
const watchDirectory = (directoryPath) => {
    fs.watch(directoryPath, { recursive: true }, (eventType, filename) => {
        console.log(`Event type: ${eventType}`);
        if (filename) {
            console.log(`File affected: ${filename}`);
            // Execute Python script when a change occurs using Python 3
            exec(`python3 ${pythonScript}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing Python script: ${error}`);
                    return;
                }
                console.log(`Python script output: ${stdout}`);
            });
        } else {
            console.log('No filename provided');
        }
    });

    console.log(`Watching directory: ${directoryPath}`);
};

// Call the function to watch the directory
watchDirectory(directoryToWatch);


// Parse JSON request bodies
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Define MongoDB connection
async function connectToDatabase() {
    try {
        const dbURI = 'mongodb+srv://sambhav511974:Sambhav1204@cluster0.ivgffuf.mongodb.net/';
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


// Define User schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    profession: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Define Contact schema and model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

//To check connection status
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

// Define API endpoint for sign up
app.post('/backsignup', async (req, res) => {
    const { name, email, phone, profession, password } = req.body;

    // Connect to MongoDB
    await connectToDatabase();

    // Create a new user instance
    const newUser = new User({
        name,
        email,
        phone,
        profession,
        password
    });

    // Save the user to the database
    try {
        await newUser.save();
        res.json({ message: 'Signup successful' });
        console.log("User saved:", newUser);
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define API endpoint for login
app.post('/backlogin', async (req, res) => {
    const { email, password } = req.body;

    // Connect to MongoDB
    await connectToDatabase();

    try {
        // Check if a user with the provided email and password exists in the database
        const user = await User.findOne({ email, password });

        if (user) {
            // If the user exists, you can set a session token or return a success message
            res.json({ message: 'Login successful', user });
            console.log(`${user.name} logged in successfully.`);
        } else {
            // If the user does not exist or the password is incorrect, return an error message
            res.status(401).json({ error: 'Invalid email or password' });
            console.log('Invalid email or password.');
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define API endpoint for handling contact form submissions
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Connect to MongoDB
    await connectToDatabase();

    // Create a new contact instance
    const newContact = new Contact({
        name,
        email,
        message
    });

    // Save the contact form submission to the database
    try {
        await newContact.save();
        res.json({ message: 'Contact form submitted successfully' });
        console.log("Contact form submission saved:", newContact);
    } catch (error) {
        console.error("Error saving contact form submission:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        // Use the original file name with a timestamp to avoid naming conflicts
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Initialize multer upload middleware
const upload = multer({ storage: storage });

// Handle POST requests to /upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
    try {
        // Access the uploaded file using req.file
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        // You can access other form fields as well, such as req.body.description
        const description = req.description
        const location = req.location
        console.log(description,location)
        // Respond with a success message
        return res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ message: 'Error uploading file. Please try again later.' });
    }
});


// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
