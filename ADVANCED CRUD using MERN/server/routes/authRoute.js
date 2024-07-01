const express=require('express')
const studentModel=require('../models/student')
const multer=require('multer')
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

router.post('/createStudent',upload.single('image'),async (req,res)=>{
    console.log("createStudent Called:")
    const { name, email, age } = req.body;
    console.log(name,email,age)
  const image = req.file;
  try {
    const student = new studentModel({
        name:name,
        email:email,
        age: age,
        image:image?image.path:null
      });
      await student.save()
      console.log("Data Saved")
      return res.status(201).json({student});
  } catch (error) {
    console.log(error)
    return res.status(300).json({ error: 'Server error' });
  }
})

router.get('/',(req,res)=>{
    studentModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

router.get('/updateStudent/:id',async (req,res)=>{
    const id = req.params.id
    await studentModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err)) 
})

router.put('/editStudent/:id',upload.single('image'),async (req,res)=>{
    const id = req.params.id 
    const image=req.file
    if(image)
      {
        await studentModel.findByIdAndUpdate({_id:id},{name:req.body.name,email:req.body.email,age:req.body.age,image:image?req.file.path:null})
        .then(users => res.json(users))
        .catch(err => res.json(err))
      }
      else{
        await studentModel.findByIdAndUpdate({_id:id},{name:req.body.name,email:req.body.email,age:req.body.age})
        .then(users => res.json(users))
        .catch(err => res.json(err))
      }
     
})

router.delete('/deleteStudent/:id',(req,res)=>{
    const id=req.params.id
    studentModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})






module.exports=router