import Company from "../models/Company.js"
import Product from "../models/Product.js"
import { faker } from '@faker-js/faker'

export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find()
        res.status(200).json(companies)
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}

export const createCompany = async (req, res) => {
    try {
        const {name, legalNumber, country, website} = req.body
        const existCompany = await Company.findOne({name})
        if(existCompany) return res.status(400).json({message: "Company already exists"})
        const company = new Company({
            name,
            legalNumber,
            country,
            website
        })
        await company.save()
        res.status(201).json(company)

    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}

export const updateCompany = async (req, res) => {
    try {
        const {id} = req.params
        const {name, legalNumber, country, website} = req.body
        const updatedCompany = {_id: id, name, legalNumber, country, website}
        await Company.findByIdAndUpdate(id, updatedCompany, {new: true})
        res.status(200).json(updatedCompany)
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}

export const deleteCompany = async (req, res) => {
    try {
        const {id} = req.params
        const companyProduct = await Product.find({company: id})
        companyProduct.map( async (p) => await Product.remove(p))
        await Company.findByIdAndRemove(id)
        res.status(204).json({message: "Company deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
        console.log(error)
    }
}

export const createMockData = async (req, res) => {
    const generateCompaniesData = (number) => {
        const companies = []
        while (number >= 0) {
          companies.push({
            name: faker.company.name(),
            legalNumber: faker.address.buildingNumber(),
            country: faker.address.country(),
            website: faker.internet.url(),
          });
          number--
        }
        return companies
      }
    await Company.insertMany(generateCompaniesData(100))
    res.sendStatus(200)
}