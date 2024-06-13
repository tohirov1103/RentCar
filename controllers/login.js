const jwt = require('jsonwebtoken');
const {Client} = require('../models/models');

const loginUser = async(req,res)=>{
    let user = await Client.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_pass');
            res.json({success:true,token})
        }else{
            res.json({success:false,error:"Wrong password"})
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"})
    }
}

const signupUser = async(req,res)=>{
    let check = await Client.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false,error:"Existing user found"});
    }
    const user = new Client({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        phonenumber:req.body.phonenumber,
    })
    await user.save();
    const data = {
        user:{
            id:user.id,
        }
    }
    const token = jwt.sign(data,'secret_pass');
    res.json({
        success:true,
        token
    })
}

module.exports = {signupUser,loginUser};