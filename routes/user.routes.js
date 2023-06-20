const express = require("express")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const { UserModel } = require("../models/user.model")

userRouter.post("/signup",async(req,res)=>{
    const {email,password} = req.body
    try {
        bcrypt.hash(password, 5, async(err, hash)=> {
            const user = new UserModel({email,password:hash})
            await user.save()
            res.send({"msg":"New user is added!"})
        });
    } catch (error) {
        res.send(error)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                res.send({"msg":"Login Successful!"})
            });
        }else{
            res.send({"msg":"Wrong Credentials"})
        } 
    } catch (error) {
        res.send(error)
    }
})

module.exports={userRouter}