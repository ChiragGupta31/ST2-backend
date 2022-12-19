const router=require("express").Router();
const User=require("../models/Users");
const bcrypt=require("bcrypt");

//REGISTER USER
router.post("/register",async(req,res)=>{
    try{
        const salt=await bcrypt.genSalt(10);
        const hashpass=await bcrypt.hash(req.body.password,salt);

        const newUser= new User({
            username:req.body.username,
            fullname:req.body.fullname,
            email:req.body.email,
            password:hashpass
        });
        const user=await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

//LOGIN USER(
router.post("/login",async(req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username})
        !user && res.status(400).json("Invalid Credentials")

        const  pwd=await bcrypt.compare(req.body.password, user.password)
        !pwd && res.status(400).json("Invalid Credentials")

        res.status(200).json(user)
    }

    catch(err){
        res.status(500).json(err);
    }
});

module.exports= router