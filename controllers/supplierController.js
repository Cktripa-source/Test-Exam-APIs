const db = require('../config/db')
// add Supplier

const AddSupplier=(req,res)=>{
    const {name,email,contact}=req.body;
    const sql = 'INSERT INTO Supplier (name,email,contact) VALUES (?,?,?)'
    db.query(sql,[name,email,contact],(err,result)=>{
        if(err)return res.status(500).send({message:"fail to add new Supplier",err:err})
            res.status(201).send({message:"Supplier Added Successfully !"})
    })
}


const GetAllSuppliers=(req,res)=>{
    const sql = 'SELECT * FROM Supplier'
    db.query(sql,(err,result)=>{
        if(err)return res.status(500).send({message:"fail to fetch Supplier"})
            res.status(201).send(result)
    })
}

const UpdateSupplier=(req,res)=>{
    const {name,email,contact}=req.body;
    const {id}=req.params;
    const sql = 'UPDATE Supplier SET name=?, email=? , contact=? WHERE id=?'
    db.query(sql,[name,email,contact,id],(err,result)=>{
        if(err)return res.status(500).send({message:"fail to Update Supplier"})
            res.status(201).send({message:"Supplier Updated Successfully !"})
    })
}

const DeleteSupplier=(req,res)=>{
    const {id}=req.params;
    const sql = 'DELETE FROM Supplier WHERE id = ?'
    db.query(sql,[id],(err,result)=>{
        if(err)return res.status(500).send({message:"fail to Delete Supplier"})
            res.status(201).send({message:"Supplier Deleted Successfully !"})
    })
}


module.exports={AddSupplier,GetAllSuppliers,UpdateSupplier,DeleteSupplier}