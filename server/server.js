import dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"
import connectDB from "./config/dbConnection.js"
import cors from "cors"
import corsOptions from "./config/corsOptions.js"
import userRoutes from "./routes/users.js"
import companyRoutes from "./routes/companies.js"
import productRoutes from "./routes/products.js"
import verifyJWT from "./middleware/verifyJWT.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000


app.use(cors()) // cors options
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use("/users", userRoutes)

app.use(verifyJWT) // private routes
app.use("/companies", companyRoutes)
app.use("/products", productRoutes)

// Connect to MongoDB
connectDB()

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})