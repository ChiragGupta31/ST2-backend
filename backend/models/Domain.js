const mongoose=require('mongoose');

const Domainschema= new mongoose.Schema(
    {
        domainname:{
            type: String,
            required: true,
        }
    }
);


module.exports=mongoose.model("Domain",Domainschema);