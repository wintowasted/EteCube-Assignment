import Product from "../models/Product.js"
import Company from "../models/Company.js"
import { faker } from '@faker-js/faker'

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("company")
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
        console.log(error)
    }
}

export const createProduct = async (req, res) => {
    try {
        const {name, category, amount, amountUnit, companyName} = req.body
        console.log(companyName)
        const existCompany = await Company.findOne({name:companyName})
        if(!existCompany) return res.status(404).json({message: "Company is not found"})
        console.log(existCompany)
        const product = new Product({
            name,
            category,
            amount,
            amountUnit,
            company: existCompany._id
        })
        await product.save()
        res.status(201).json(await product.populate("company"))
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
        console.log(error)
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params
        const {name, category, amount, amountUnit, companyName} = req.body
        const existCompany = await Company.findOne({name: companyName})
        if(!existCompany) return res.status(404).json({message: "Company is not found"})
        const updatedProduct = {_id:id, name, category, amount, amountUnit, company:existCompany._id}
        const result = await Product.findByIdAndUpdate(id, updatedProduct, {new: true}).populate("company")
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
        console.log(error)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params
        await Product.findByIdAndRemove(id)
        res.status(204).json({message: "Product deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}

export const createMockData = async (req, res) => {

    const generateProductsData = async (number) => {
        const products = []
        const companies = await Company.find()
    
        while (number >= 0) {
        const randomInt = Math.floor(Math.random() * companies.length)
          products.push({
            name: faker.commerce.product(),
            category: faker.commerce.productMaterial(),
            amount: faker.finance.amount(100, 10000, 0),
            amountUnit: faker.science.unit().name,
            company: companies[randomInt]._id
          });
          number--
        }
        return products
      }

    await Product.insertMany(await generateProductsData(200))
    res.sendStatus(200)
}