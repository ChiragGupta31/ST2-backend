const router=require("express").Router();
const User=require("../models/Users");

const Posts = require("../models/Posts");

//CREATE POST
router.post("/",async(req,res)=>{
    const newpost=new Posts(req.body);
    try{
        const savedpost=await newpost.save();
        res.status(200).json(savedpost);
    }
    catch(err){
        res.status(500).json(err)
    }

});
//UPDATE POST
router.put("/:id",async(req,res)=>{
    try{
        const post=Posts.findById(req.params.id);
        
            if (post.username === req.body.username){
               try{ 
                const updatedPost=await Posts.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body
                    },
                    {new: true}
                );
                res.status(200).json(updatedPost);
               }catch(err){
                res.status(500).json(err)
               }
            }else{
                res.status(401).json("Can't update someone's post")
            }
        
    }catch(err){
        res.status(500).json(err)

    }
    
});
//delete post
router.delete("/:id",async(req,res)=>{
    try{
        const post=Posts.findById(req.params.id);
        
            if (post.username === req.body.username){
               try{ 
                await post.delete();
                res.status(200).json("Post deleted");
               }catch(err){
                res.status(500).json(err)
               }
            }else{
                res.status(401).json("Can't delete someone's post")
            }
        
    }catch(err){
        res.status(500).json(err)

    }
    
});


//get post

router.get("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});

// GET ALL POSTS
router.get("/",async(req,res)=>{
    const username=req.query.user;
    const domainname=req.query.domain
    try{
        let post;
        if(username){
            post=await Posts.find({username})
        }
        else if(domainname){
            post=await Posts.find({domains:{
                $in:[domainname]
            }})
        } else{
            post=await Posts.find();
        }
        
         res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});






module.exports=router;