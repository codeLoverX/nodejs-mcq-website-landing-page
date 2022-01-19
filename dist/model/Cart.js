"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
// var slugify = require('slugify')
var faker = require('faker');
const CartSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'User'
    },
    description: [{
            quantity: Number,
            size: String
        }],
    products: [
        {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'Product'
        }
    ],
    status: {
        type: String,
        enum: ['active', 'paid', 'delivered'],
        default: 'active'
    },
    paidAt: Date,
    deliveredAt: Date,
    creation_date: { type: Date, default: new Date() }
}, 
// The strict option, (enabled by default), ensures that values passed to our model constructor that were not 
//  specified in our schema do not get saved to the db.
{ strict: true, timestamps: true });
const Cart = (0, mongoose_1.model)('Cart', CartSchema);
exports.Cart = Cart;
// exports 'Product' interface
