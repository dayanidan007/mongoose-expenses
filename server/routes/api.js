const express = require('express')
const router = express.Router()
const moment = require('moment')
const Expense = require('../model/Expense')
router.use(express.json())

router.get('/:expenses', function (req, res) {
    Expense.find({}, function (err, expenses) {
        console.log(expenses)
        res.send(expenses)
    })
})


router.post('/:expense', function (req, res) {
    let data = req.body
    let expense = new Expense({
        item: data.item,
        amount: data.amount,
        date: data.date ? moment(new Date(data.date)).format('LLLL') : moment().format('LLLL'),
        group: data.group
    })
    expense.save().then(response => {
        console.log(`You spend ${response.amount} to buy ${response.item}`)
        res.send(response)
    })
})



router.put('/update/:group1/:group2', function (req, res) {
    let firstGroup = req.params.group1
    let lastGroup = req.params.group2
    Expense.findOneAndUpdate({ group: firstGroup }, { group: lastGroup }, { new: true }, function (err, expense) {
        console.log(`the group change from ${expense.item} to ${lastGroup}`)
        res.send(`the group change from ${expense.item} to ${lastGroup}`)
    })

})
/*
router.get('/expenses/:group', function (req, res) {
    let desiredGroup = req.params.group
    Expense.find({group:desiredGroup }, function (err, expense) {
        res.send(expense)
    })
})*/

router.get('/expenses/:group', function (req, res) {
    let desiredGroup = req.params.group
    let total = req.query
    if (total) {
        Expense.aggregate(
            [
                { $match: { group: desiredGroup } },
                {
                    $group:
                    {
                        _id: null,
                        total: { $sum: "$amount" }
                    }
                }],
            function (err, expense) {
                res.send(expense)
            })
    }else{
        Expense.find({},function(err,response){
            res.send(response)
        })
    }
})



router.get('/expenses', function (req, res) {
    let { d1, d2 } = req.query
    if (d1 && d2) {
        Expense.find(
            {date: { "$gt": d1, "$lt": d2 }}).then(response => {
                console.log(`You spend ${response.amount} to buy ${response.item}`)
                res.send(response)
              } else if (d1 && !d2) {
        Expense.find(
            {
                date: {
                    $and: [{ $gt: d1 }, { $lt: new Date() }]
                }
            },
            function (err, expense) {
                console.log('d1 just work')
                res.send(expense)
            })
    } else {
        Expense.find({},
            function (err, expense) {
                console.log('nobady work')
                res.send(expense)
            })
    }
})


module.exports = router
