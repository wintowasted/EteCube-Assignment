import User from "../models/User.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const userLogin = async (req, res) => {
    try {
        const {username, password} = req.body
        const existUser = await User.findOne({username})
        if (!existUser) return res.status(404).json({message: "User not found"})
        const checkPassword = await bcrypt.compare(password, existUser.password)
        if (!checkPassword) return res.status(404).json({message: "Invalid password"})
        const token = jwt.sign({username: existUser.username, id: existUser._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
        res.status(200).json({result: existUser, token})
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}


export const userRegister = async (req, res) => {
    try {
        const {username, email, password} = req.body
        const existEmail = await User.findOne({email})
        if(existEmail) return res.status(404).json({message: "Email already exists"})
        const existUsername = await User.findOne({username})
        if(existUsername) return res.status(404).json({message: "Username already exists"})
        const hashedPass = await bcrypt.hash(password, 10)
        const result = await User.create({username, email, password: hashedPass})
        const token = jwt.sign({username: result.username, id: result._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
        res.status(200).json({result, token})

    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}
