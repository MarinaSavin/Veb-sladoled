import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});


const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Resource not found");
    }
});

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        user: req.user._id,
        image: req.body.image || '/images/products/vanila-bourbon.png',
        category: req.body.category,
        countInStock: req.body.countInStock,
        numReviews: 0,
        description: req.body.description,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Resource not found");
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.status(200).json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error("Resource not found");
    }
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
