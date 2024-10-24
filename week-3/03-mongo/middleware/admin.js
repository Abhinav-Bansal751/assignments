const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware (req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    
    const username = req.headers.username;
    const password = req.headers.password;
     // Check if username and password are provided
     if (!username || !password) {
        return res.status(400).send("Missing username or password");
    }

    try {
        const result = await Admin.findOne({username,password});
        if( result ) next();// If valid credentials, proceed to the next middleware or route handler
        else return res.status(401).send("Invalid credentials, no Admin found");
        
    } catch (error) {
        res.status(500).send("error occured ",error.message);
    }

}

module.exports = adminMiddleware;