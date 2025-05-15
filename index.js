const express= require( 'express');
const cors= require( 'cors');
const multer = require('multer');
const path=require('path')
require('dotenv').config

//publisher controllers 
const {AddPublisher,GetAllPublishers,UpdatePublisher,DeletePublisher} =require('./controllers/publisherController')

//supplier controllers 
const {AddSupplier,GetAllSuppliers,UpdateSupplier,DeleteSupplier} =require('./controllers/supplierController')

//books controllers 

const {AddBook,GetAllBooks,UpdateBook,DeleteBook}=require('./controllers/bookController')

//borrow controller

const {AddBorrow,GetAllBorrow,UpdateBorrow,DeleteBorrow}=require('./controllers/borrowController')

//member controller
const {Register,Login}=require('./controllers/memberController');


const {PORT}=process.env
const app = express();

//handle file upload

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({storage:storage})

app.use(express.json());
app.use(cors({
  origin: 'https://mylibrary-cbg.vercel.app', // ✅ Exact domain, not wildcard
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
//publisher routes
app.post('/addPublisher',AddPublisher)
app.get('/getPublishers',GetAllPublishers)
app.put('/updatePublisher/:id',UpdatePublisher)
app.delete('/deletePublisher/:id',DeletePublisher)

//supplier routes
app.post('/addSupplier',AddSupplier)
app.get('/getSuppliers',GetAllSuppliers)
app.put('/updateSupplier/:id',UpdateSupplier)
app.delete('/deleteSupplier/:id',DeleteSupplier)

// book routes
app.post('/addBook',upload.single('image'),AddBook)
app.get('/getBooks',GetAllBooks)
app.put('/updateBook/:id',upload.single('image'),UpdateBook)
app.delete('/deleteBook/:id',DeleteBook)

//borrow routes
app.post('/addBorrow',AddBorrow)
app.get('/getBorrows',GetAllBorrow)
app.put('/updateBorrow/:id',UpdateBorrow)
app.delete('/deleteBorrow/:id',DeleteBorrow)

//member routes
app.post('/register',Register)
app.post('/login',Login)

const port=PORT||5000
app.listen(port,()=>{
    console.log('Server is runnning on the port ',port)
})
