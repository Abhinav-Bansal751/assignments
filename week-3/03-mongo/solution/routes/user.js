const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username, 
        password
    })
    res.json({
        message: "User created successfully"
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
     // Implement fetching all courses logic
     const response = await Course.find({});

     res.json({
         courses: response
     })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

        // Check if username is provided
        if (!username) {
            return res.status(400).json({ message: "Username is required." });
        }

        try {
           const result =  await User.updateOne({
                username: username
            }, {
                "$push" :{
                    purchasedCourses:courseId
                }
            })

            if(result.nmodified === 0 ) 
                return res.send("")
            res.json({
                message: "Purchase complete!"
            })
            
        } catch (error) {
            console.log("error occured while purchasing course ",error)
            return res.status(500).send("error occured while purchasing course ");
        }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router