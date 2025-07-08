const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
    "mongodb+srv://vedangc03:CTGuKDYapj3iADlH@cluster0.vnimdtb.mongodb.net/paytm"
);

// Schema of users table
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

// Schema of accounts table
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    balance : {
        type: Number,
        default: 0
    },
})

// Model 
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account
};