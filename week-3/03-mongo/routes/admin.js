const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup',async (req, res) => {
    // Implement admin signup logic
    const username = req.header;
    const password = req.header;

    try {
        // check if a user with this username already exists
        const existingAdmin  = await Admin.findOne({username});
        if( existingAdmin  ) return res.status(200).send("user with that username already exists");

        await Admin.create({username:username,password:password});
        res.status(200).json({ message: 'Admin created successfully' });
        
    } catch (error) {
        console.log("error occured in creating admin ",error);
        res.status(500).send("error occured ");
    }

});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;