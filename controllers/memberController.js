const db = require('../config/db');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
require('dotenv').config();

const Register=(req,res)=>{
    const {name,email,role,password}=req.body;
    if (!name || !email || ! role || ! password) {
        return res.status(400).send({message:'please fill all fields !'})
    }
    const select='SELECT * FROM member WHERE email =?';
    db.query(select,[email],async(err,result)=>{
        if (err) {
            return res.status(500).send({message:`fail to verify email exist`})
        }
        const existEmail=result.find(user=>user.email===email);
        if (existEmail) return res.status(403).send({message:`Email ${email} already taken, try another !`})
       const hashPassword=await bcrypt.hash(password,12);
      if (!hashPassword)return res.status(500).send({message:"fail to hash password"})
        const sql='INSERT INTO member (name,email,role,password) VALUES (?,?,?,?)';
    db.query(sql,[name,email,role,hashPassword],(err,result)=>{
        if (err) {
            return res.status(500).send({message:`Register Fail ${name} , try again`})
        }
        res.status(201).send({message:`Thank you ${name} Registed Successully `})
    })
    })
}

const Login = (req,res)=>{
    const {email,password}=req.body;
    const sql='SELECT * FROM member WHERE email = ?'
    db.query(sql,[email],async(err,result)=>{
        if(err)return res.status(500).send({message:`Fail Login ${email} , Try Again `})
        if(result.length==0)return res.status(404).send({message:`user with email ${email} Not found !`})
            const user=result[0];
        const unHashPassword=await bcrypt.compare(password,user.password);
        if(!unHashPassword)return res.status(401).send({message:`Invalid password ${password} for email ${email}`})
       const token=jwt.sign({id:user.id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
        if (token) return res.status(200).send({
            message: "Login Successfully !",
            token: token,
            userId: user.id  
        })
        
    })
}

module.exports={Register,Login}