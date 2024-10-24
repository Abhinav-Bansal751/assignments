const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
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

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    const {title,description,price,imageLink} = req.body;

    if(!title || !description || !price || !imageLink )
        return res.status(400).send("Some fields are incomplete,Please Send all feilds");

    try {

        const newCourse = await Course.create({
            title,
            description,
            price,
            imageLink
        });

        res.status(201).json({courseId : newCourse._id});

    } catch (error) {
        res.status(500).send(`Some error occurred: ${error.message}`);
        
    }

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic

    try {
        const response = await Course.find({});
        return res.status(200).json({courses:response});
        
    } catch (error) {
        res.send(`error occured ${error.message}`);
    }

});

module.exports = router;