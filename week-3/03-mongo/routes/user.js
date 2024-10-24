const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../solution/db");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
      const username = req.headers.username;
      const password = req.headers.password;
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
    const response = await Course.find({});

    res.json({
        courses: response
    })

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.headers.username;
    const courseId = req.params.courseId;

      // Check if username is provided
      if (!username) {
        return res.status(400).json({ message: "Username is required." });
    }


    try {
        
            const result = await User.updateOne({
                username:username
            },{
                "$push":{
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

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic

    try {
        const user = await User.findOne({
            username: req.headers.username
        });
       const courses =  await Course.find({
            _id:{
                "$in":user.purchasedCourses
            }
        })
        return res.send(courses).status(200);

        
    } catch (error) {
        console.log("error occured  ",error)
        return res.status(500).send("error occured  ");
    
    }
});

module.exports = router