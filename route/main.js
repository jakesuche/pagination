var router = require('express').Router()
var faker = require('faker')
var Product = require('../model/products')

router.get('/add-product', function(req, res, next) {
    res.render('main/add-product')
})

router.post('/add-product', function(req, res, next) {
    var product = new Product()

    product.category = req.body.category_name
    product.name = req.body.product_name
    product.price = req.body.product_price
    product.cover = faker.image.image()

    product.save(function(err) {
        if (err) throw err
        res.redirect('/add-product')
    })
})

router.get('/generate-fake-data', function(req, res, next) {
    for (var i = 0; i < 90; i++) {
        var product = new Product()

        product.category = faker.commerce.department()
        product.name = faker.commerce.productName()
        product.price = faker.commerce.price()
        product.cover = faker.image.image()

        product.save(function(err) {
            if (err) throw err
        })
    }
    res.redirect('/add-product')
})

router.get('/products/:page', function(req, res, next) {
    var perPage = 9
    var page = req.params.page 
    console.log(page)

    Product
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
            Product.countDocuments().exec(function(err, count) {
                console.log(Math.ceil(count/perPage))
                if (err) return next(err)
                res.render('main/product', {
                    products: products,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
            // pages:Math.ceil(count/perPage) this will give 11 pages 
        })
})
router.get('/', function(req, res, next) {
    res.render('index')
})

module.exports = router