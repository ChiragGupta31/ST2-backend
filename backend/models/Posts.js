const mongoose=require("mongoose");
const PostSchema=new mongoose.Schema( {
        title:{
            type:String,
            required:true,
            unique:true
        },
        description:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        },
        domains:{
            type:Array,
            required:false
        }
});

module.exports=mongoose.model("Post",PostSchema); 