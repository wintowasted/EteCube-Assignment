import jwt from "jsonwebtoken"

const verifyJWT = async (req, res, next) => {
    const auth = req.headers["authorization"]
    if(!auth) return res.sendStatus(401)
    const token = auth.split(" ")[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403)
            next() 
        }
    )
}

export default verifyJWT