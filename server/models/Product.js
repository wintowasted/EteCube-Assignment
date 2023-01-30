import mongoose from "mongoose";
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    amountUnit: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Types.ObjectId,
        ref: "Company",
        required: true
    }
})

export default mongoose.model("Product", productSchema)