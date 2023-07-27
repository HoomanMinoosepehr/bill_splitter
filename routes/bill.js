const express = require('express');
const router = express.Router();
const knex = require('../db/client');


// ********************** Index ********************** 
router.get('/index', (req, res) => {
    knex
        .select('*')
        .from('bill')
        .then(data => { 
            res.render('bills/bill_index' , { data: data || '' })
         }).catch(err => {
            res.send('<h3>Something Went Wrong!</h3>')
        });
});

router.post('/index' , (req , res) => {
    const { total , tTax , tipamount , tPay , each } = req.body;
    knex('bill')
        .insert({ total , tTax , tipamount , tPay , each })
        .then( data => {
            res.redirect('/bill_splitter/index')
        }).catch(err => {
            res.send('<h3>Something Went Wrong!</h3>')
        })
});

// *********************** New *********************** 
router.get('/new' , (req , res) => {
    res.render('bills/bill_splitter', { tPay: '' , tipamount: '' , tTax: '' , total: '' , each: '' });
});

router.post('/new' , (req , res) => {
    const { people , liqour , food , tip } = req.body;
    let total = parseFloat(liqour) + parseFloat(food);
    let liqouTax = parseFloat(liqour) * 0.1;
    let GST = total * 0.05;
    let PST = parseFloat(food) * 0.07;
    let tTax = (liqouTax + GST + PST).toFixed(2);
    let tipamount = (total * (parseInt(tip) / 100));
    let tPay = (total + liqouTax + GST + PST + tipamount).toFixed(2);
    const each = (tPay / people).toFixed(2);
    res.render('bills/bill_splitter' , { tPay , tipamount , tTax , total , each })
});

// *********************** Show ********************** 
router.get('/:id' , (req , res) => {
    const { id } = req.params;
    knex
        .select('*')
        .from('bill')
        .where('id' , id)
        .first()
        .then(data => {
            res.render('bills/detail' , { data })
        }).catch(err => {
            res.send('<h3>Something Went Wrong!</h3>')
        })
})

// ********************* Delete ********************** 
router.delete('/:id' , (req , res) => {
    const { id } = req.params;
    knex('bill')
        .del()
        .where('id' , id)
        .then(data => res.redirect('/bill_splitter/index'))
        .catch(err => {
            res.send('<h3>Something Went Wrong!!!</h3>')
        })
})

module.exports = router;