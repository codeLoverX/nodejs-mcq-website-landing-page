"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.Comment = void 0;
const mongoose_1 = require("mongoose");
// var slugify = require('slugify')
var faker = require('faker');
// not written in the docs but must be written!!!
// ** extends Document **
const CommentSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
});
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    image: String,
    slug: String,
    price: {
        type: Number,
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    amount: {
        type: Number,
        default: 0
    },
    comment: [CommentSchema]
}, 
// The strict option, (enabled by default), ensures that values passed to our model constructor that were not 
//  specified in our schema do not get saved to the db.
{ strict: true });
const Comment = (0, mongoose_1.model)('Comment', CommentSchema);
exports.Comment = Comment;
const Product = (0, mongoose_1.model)('Product', ProductSchema);
exports.Product = Product;
ProductSchema.pre('save', function () {
    this.slug = faker.helpers.slugify(this.name);
    console.log(this.slug);
});
// exports 'Product' interface
