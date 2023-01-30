import express from "express"
import {createCompany, deleteCompany, getAllCompanies, updateCompany,createMockData} from "../controllers/companiesController.js"

const router = express.Router()

router.route("/")
    .get(getAllCompanies)
    .post(createCompany)

router.route("/:id")
    .patch(updateCompany)
    .delete(deleteCompany)

router.route("/mock")
    .post(createMockData)
    
export default router