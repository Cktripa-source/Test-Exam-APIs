const db = require('../config/db')
// add Book

const AddBook=(req,res)=>{
    const {title,genre,pub_year,publisher_id,supplier_id}=req.body;
    const image=req.file ? req.file.path.replace(/\\/g,'/'):null;

    const sql = 'INSERT INTO bookstore (title,genre,pub_year,image,publisher_id,supplier_id,status) VALUES (?,?,?,?,?,?,?)'
    db.query(sql,[title,genre,pub_year,image,publisher_id,supplier_id,'available'],(err,result)=>{
        if(err)return res.status(500).send({message:"fail to add new Book",err:err})
            res.status(201).send({message:"Book Added Successfully !"})
    })
}


const GetAllBooks = (req, res) => {
    const sql = `
        SELECT bookstore.*,
               supplier.id AS supplier_id,
               supplier.name AS supplier_name,
               supplier.email AS supplier_email,
               supplier.contact AS supplier_contact,
               publisher.id AS publisher_id,
               publisher.name AS publisher_name,
               publisher.email AS publisher_email,
               publisher.contact AS publisher_contact,
               CASE
                   WHEN EXISTS (
                       SELECT 1 FROM borrowrecords
                       WHERE borrowrecords.book_id = bookstore.id
                         AND borrowrecords.status = 'active'
                   ) THEN 'borrowed'
                   ELSE 'available'
               END AS status
        FROM bookstore
        JOIN publisher ON bookstore.publisher_id = publisher.id
        JOIN supplier ON bookstore.supplier_id = supplier.id
    `;
    db.query(sql, (err, result) => {
        if (err) return res.status(500).send({ message: "fail to fetch Book" });
        res.status(201).send(result);
    });
};


const UpdateBook=(req,res)=>{
    const {id}=req.params;
    const {title,genre,pub_year,publisher_id,supplier_id}=req.body;
    const image=req.file ? req.file.path.replace(/\\/g,'/'):null;

    const sql = `UPDATE bookstore SET title=?, genre=? , pub_year=?,${image ? 'image=?':''},publisher_id=?,supplier_id=? WHERE id=?`
    db.query(sql,[title,genre,pub_year,image,publisher_id,supplier_id,id],(err,result)=>{
        if(err)return res.status(500).send({message:"fail to Update Book",err:err})
            res.status(201).send({message:"Book Updated Successfully !"})
    })
}

const DeleteBook=(req,res)=>{
    const {id}=req.params;
    const sql = 'DELETE FROM bookstore WHERE id = ?'
    db.query(sql,[id],(err,result)=>{
        if(err)return res.status(500).send({message:"fail to Delete Book"})
            res.status(201).send({message:"Book Deleted Successfully !"})
    })
}


module.exports={AddBook,GetAllBooks,UpdateBook,DeleteBook}