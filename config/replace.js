app.post('/addBorrow',AddBorrow)
app.get('/getBorrows',GetAllBorrows)
app.put('/updateBorrow/:id',UpdateBorrow)
app.delete('/deleteBorrow/:id',DeleteBorrow)