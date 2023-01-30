import mongoose from "mongoose"

const Schema = mongoose.Schema

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    legalNumber: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    }
})

export default mongoose.model("Company", companySchema)