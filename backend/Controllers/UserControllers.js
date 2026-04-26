// import user from database
const User = require("../model/user");

// register user
// export register user function
exports.registerUser = async (req, res) => {
    
    const { name, email, password } = req.body;

    // backend validation
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already registered"
            });
        }

        // create new user
        const newUser = new User({
            name,
            email,
            password,
        });

        // save user to database
        await newUser.save();

        res.status(200).json({
            message: "User registered successfully"
        });

    } catch (error) {
        // if something went wrong
        res.status(500).json({
            message: "Server Error"
        });
    }
};

     //  LOGIN CONTROLLER 
// This function runs when the user sends POST /api/login
exports.login = async (req, res) => {

    // Extract email and password from frontend
    const { email, password } = req.body;

     // Backend validation for empty fields
  if ( !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

    try {
        // Check if a user exists with this email + password
        const user = await User.findOne({ email, password });

        if (!user) {
            // If no match found, login fails
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // If user exists, login successful
        res.json({ message: "Login successful" });

    } catch (error) {
        // If something goes wrong, send error message
        res.status(500).json({ message: "Server error", error });
    }
};