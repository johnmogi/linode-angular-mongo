const mongoose = require("mongoose");

// "_id" : ObjectId("5ed0cd6985a9ebf8bb5f5ca9"),
// "identification" : 123456789,
// "username_email" : "1@1.com",
// "firstName" : "1",
// "lastName" : "1",
// "password" : "1",
// "city" : "1",
// "street" : "1",
// "role" : "Admin" | "Customer"
// "visitCounter": 0

const AuthSchema = mongoose.Schema({
    identification: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 10
    },
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    username_email: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 40
    },
    password: {
        type: String,
        required: true,
        minlength: 1
    },
    city: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30
    },
    street: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 60
    },
    role: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 60
    },
    visitCounter:{
        type: Number,
        required: false
    }

}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

AuthSchema.virtual("cartShop", {
    ref: "Cart",
    localField: "_id",
    foreignField: "userId"
});
const User = mongoose.model("User", AuthSchema, "auth-users");

module.exports = User;
