const router=require('express').Router();
const Domain=require("../models/Domain");


router.post('/',async(req,res)=>{
    const newdomain=new Domain(req.body);
    try{
        const domainsaved= await newdomain.save();
        res.status(200).json(domainsaved);
    } catch(err){
        res.status(500).json(err);
    }
});


router.get('/',async(req,res)=>{
    
    try{
        const domains= await Domain.find();
        res.status(200).json(domains);
    } catch(err){
        res.status(500).json(err);
    }
});




module.exports=router;