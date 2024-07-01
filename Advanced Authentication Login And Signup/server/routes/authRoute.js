const authController=require('../controllers/authController')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const User=require('../models/user')
const multer=require('multer')
const nodemailer=require('nodemailer')
const express=require('express')

const router=express.Router()


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Define routes
router.post('/register',upload.single('image'),authController.register);
router.post('/login',authController.login)
router.put('/profile', upload.single('image'), authController.editProfile);
router.delete('/delete-account',authController.deleteAccount)
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.status(200).json({ status: "successful" })
})

router.post('/verifyemail', async (req,res)=>{
    try {
        const {email} = req.body
        
        const userexist=await User.findOne({email})
        if(userexist)
          {
            return res.status(300).json({message:"User Already Exists!!!"})
          }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'neogirohit872@gmail.com',
              pass: 'zvjf eobz ircz hget'
            }
          });
          
          var mailOptions = {
            from: 'neogirohit872@gmail.com',
            to: email,
            subject: 'Email verification Link!',
            text: `http://localhost:3000/verifyemail/${email}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
             return res.status(200).json({message: "mail sent"})
            }
          });
          

    } catch (error) {
        console.log(error)
    }
})


module.exports=router