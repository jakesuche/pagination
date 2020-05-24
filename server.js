const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const users = require('./users')
const  ejs = require('ejs');
const faker = require('faker')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/EmployeeDb', {useNewUrlParser:true,useUnifiedTopology:true})



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

var mainRoutes = require('./route/main')
app.use(mainRoutes)




app.listen(8000, function () {
    console.log('app listen at port 8000')
})


app.set('view engine', 'ejs')