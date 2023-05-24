const myModel = require('../model/userModel')
const bcrypt = require('bcrypt-inzi')
const jwt = require('../middleware/jwtMiddleware')
exports.createUser = async (req,res)=>{
    try{
        const {name,email,password} = req.body
        //check if user is register alread
        const existing = await myModel.findOne({email})
        if(existing)
        {
            return res.status(400).json({messge:"user already register"})
         }
         //make sure recived all fields
         if(!name||!email||!password)
         {
            return res.status(400).json({messge:"All fields required"})
         }
         //hashpswd
         const hashpwsd = await bcrypt.stringToHash(password,10)

         //create user
         const user = await new myModel({
            name,
            email,
            password:hashpwsd
         })
         await user.save()
         const token = await jwt.sign(req.body)
         return res.status(200).json({token})
    }
    catch(error){
       return res.status(500).json({error:error.messge})
    }
}
exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        //find user if available
        const user = await myModel.findOne({email})
        //verifyHash
        const verifyHash = await bcrypt.varifyHash(password,user.password)
        if(!verifyHash){
            return res.status(400).json({messge:"wrong password"})
        }
        return res.status(200).json(user)
    }
    catch(error)
    {
            return res.status(500).json({messge:"internal server error",error:error.messge})
    }
}
