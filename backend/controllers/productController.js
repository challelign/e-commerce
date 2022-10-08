


const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apifFeatures')



// create new product =>    /api/v1/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(200).json({
        success: true,
        product
    })
})


// Get ALL prducts   => /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;
    const productCount = await Product.countDocuments();

    const apifFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    // const products = await Product.find();
    const products = await apifFeatures.query;


    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products

        // message: 'This route will show all products in database.'
    })
})


// Get single  prducts   => /api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id.trim());
    if (!product) {

        return next(new ErrorHandler('Product not Found', 404));

        // return res.status(404).json({
        //     success: false,
        //     message: 'product not found'
        // })
    }

    res.status(200).json({
        success: true,
        product
    })
})

// Update Product     => /api/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id.trim());
    if (!product) {

        return next(new ErrorHandler('Product not Found', 404));

        // return res.status(404).json({
        //     success: false,
        //     message: 'product not found'
        // })
    }
    product = await Product.findByIdAndUpdate(req.params.id.trim(), req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product
    })
})

// Delete Product    => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id.trim());
    if (!product) {
        return next(new ErrorHandler('Product not Found', 404));

        // return res.status(404).json({
        //     success:false,
        //     message:"Product not found",
        // })
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: 'Product is removed '
    })
})