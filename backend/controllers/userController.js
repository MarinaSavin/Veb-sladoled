import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import generateToken from '../utils/generateToken.js'


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {

        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Logged out successfully' });
});


const getFavoriteProducts = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('favorites');

    if (user) {
        res.status(200).json(user.favorites);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


const addFavoriteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.productId);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    const user = await User.findById(req.user._id);

    if (user) {
        const alreadyFavorite = user.favorites.some(
            (favoriteId) => favoriteId.toString() === product._id.toString()
        );

        if (!alreadyFavorite) {
            user.favorites.push(product._id);
            await user.save();
        }

        const updatedUser = await User.findById(req.user._id).populate('favorites');
        res.status(200).json(updatedUser.favorites);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


const removeFavoriteProduct = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.favorites = user.favorites.filter(
            (favoriteId) => favoriteId.toString() !== req.params.productId
        );

        await user.save();

        const updatedUser = await User.findById(req.user._id).populate('favorites');
        res.status(200).json(updatedUser.favorites);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    authUser, registerUser, logoutUser,
    getFavoriteProducts, addFavoriteProduct, removeFavoriteProduct
};
