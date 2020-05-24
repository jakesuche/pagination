const express = require('express')
const app = express()
const mongoose = require('mongoose')
const users = require('./users')
mongoose.connect('mongodb://localhost:27017/EmployeeDb', {useNewUrlParser:true,useUnifiedTopology:true})

const db = mongoose.connection
db.once('open', async()=>{
    if(await users.countDocuments().exec()) return

    Promise.all([
        users.create({name: "user 1 "}),
        users.create({name: "user 2 "}),
        users.create({name: "user 3 "}),
        users.create({name: "user 4 "}),
        users.create({name: "user 5 "}),
        users.create({name: "user 6 "}),
        users.create({name: "user 7 "}),
        users.create({name: "user 8 "}),
        users.create({name: "user 9 "}),
        users.create({name: "user 10 "})
    ])
})




app.get('/users', paginated(users),function (req, res) {

    res.json(res.paginated)

})

function paginated(model) {

    return async  (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        console.log(limit)

        const startIndex = (page - 1) * limit

        const endIndex = page * limit
        console.log(startIndex, endIndex)
        const results = {}
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        
       
        

        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        res.paginated = results

        try {
        results.result =  await  model.find().limit(limit).skip(startIndex).exec()
       

           
       // res.json(results)
        next()
        } catch(e){
            res.status(500).json({message:e.message})
        }
        
    }
}


app.listen(8000, function () {
    console.log('app listen at port 8000')
})


