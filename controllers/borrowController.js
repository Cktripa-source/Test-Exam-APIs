const db = require('../config/db')
// add Borrow

const AddBorrow = (req, res) => {
    const { book_id, member_id } = req.body;
    const return_date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // +7 days
    const sql = 'INSERT INTO Borrowrecords (book_id, member_id, return_date, status) VALUES (?, ?, ?, ?)';
    db.query(sql, [book_id, member_id, return_date, 'active'], (err, result) => {
        if (err) return res.status(500).send({ message: "Fail to add new Borrow", err: err });
        res.status(201).send({ message: "Borrow Added Successfully!" });
    });
};


const GetAllBorrow=(req,res)=>{
    const sql =`SELECT borrowrecords.* ,
                bookstore.title AS book_name,
                member.name AS borrower_name,
                member.email AS borrower_email
                FROM borrowrecords
                JOIN bookstore ON bookstore.id = borrowrecords.book_id 
                JOIN member ON member.id = borrowrecords.member_id
    `
    db.query(sql,(err,result)=>{
        if(err)return res.status(500).send({message:"fail to fetch Borrow"})
            res.status(201).send(result)
    })
}

const UpdateBorrow = (req, res) => {
    const { status } = req.body; // expect status to come from frontend: 'active' or 'returned'
    const { id } = req.params;
    const sql = 'UPDATE Borrowrecords SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
        if (err) return res.status(500).send({ message: "Fail to Update Borrow", err: err });
        res.status(201).send({ message: "Borrow Updated Successfully!" });
    });
};


const DeleteBorrow=(req,res)=>{
    const {id}=req.params;
    const sql = 'DELETE FROM Borrowrecords WHERE id = ?'
    db.query(sql,[id],(err,result)=>{
        if(err)return res.status(500).send({message:"fail to Delete Borrow"})
            res.status(201).send({message:"Borrow Deleted Successfully !"})
    })
}


module.exports={AddBorrow,GetAllBorrow,UpdateBorrow,DeleteBorrow}