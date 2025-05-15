const db = require('../config/db')
// add publisher

const AddPublisher=(req,res)=>{
    const {name,email,contact}=req.body;
    const sql = 'INSERT INTO publisher (name,email,contact) VALUES (?,?,?)'
    db.query(sql,[name,email,contact],(err,result)=>{
        if(err)return res.status(500).send({message:"fail to add new publisher",err:err})
            res.status(201).send({message:"Publisher Added Successfully !"})
    })
}


const GetAllPublishers=(req,res)=>{
    const sql = 'SELECT * FROM publisher'
    db.query(sql,(err,result)=>{
        if(err)return res.status(500).send({message:"fail to fetch publisher"})
            res.status(201).send(result)
    })
}

const UpdatePublisher=(req,res)=>{
    const {name,email,contact}=req.body;
    const {id}=req.params;
    const sql = 'UPDATE publisher SET name=?, email=? , contact=? WHERE id=?'
    db.query(sql,[name,email,contact,id],(err,result)=>{
        if(err)return res.status(500).send({message:"fail to Update publisher"})
            res.status(201).send({message:"Publisher Updated Successfully !"})
    })
}

const DeletePublisher=(req,res)=>{
    const {id}=req.params;
    const sql = 'DELETE FROM publisher WHERE id = ?'
    db.query(sql,[id],(err,result)=>{
        if(err)return res.status(500).send({message:"fail to Delete publisher"})
            res.status(201).send({message:"Publisher Deleted Successfully !"})
    })
}


module.exports={AddPublisher,GetAllPublishers,UpdatePublisher,DeletePublisher}