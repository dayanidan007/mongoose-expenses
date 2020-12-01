const express = require('express')
const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    item: String,
    amount: Number,
    date: String,
    group: String
})

const Expense = mongoose.model("expense", expenseSchema)

let expenses = require('../model/expenses')
expenses.forEach(e => {new Expense(e).save()});

module.exports = Expense
