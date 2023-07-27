const express = require('express');
const app = express();
const log = require('morgan');
const path = require('path');
const ejs = require('ejs');
const methodOverride =  require('method-override')

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views' , 'views');
app.use(express.static(path.join(__dirname , 'public')));
app.use(log('dev'));

app.use(methodOverride(( req , res ) => {
   if (req.body._method){
    const method = req.body._method
    delete req.body._method;
    return method;
   } 
}))

app.get('/', (req , res) => {
    res.render('home')
});

const bills = require('./routes/bill');
app.use('/bill_splitter' , bills);

const port = 3000;
const host = 'localhost';
app.listen(port , host , () => {
    console.log(`Server is listenning to ${host}:${port}`)
});