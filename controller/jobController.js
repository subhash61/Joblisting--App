//get all job
//get job
//create job
//delete job
//update job
const Job = require('../model/jobModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: 'success',
    data: {
      products,
    },
  });
});
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  console.log(product);
  if (!product) {
    console.log('abcd');
    return next(new AppError('No Product found with that id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.createProduct = catchAsync(async (req, res) => {
  // console.log(req.body);
  const product = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.productId);
  if (!product) {
    return next(new AppError('No Product found with that id', 404));
  }
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});
exports.updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedProduct) {
    return next(new AppError('No Product found with that id', 404));
  }

  res.status(200).json({
    status: 'sucess',
    data: updatedProduct,
  });
});
