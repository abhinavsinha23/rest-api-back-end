const jwt = require("jsonwebtoken")
require("dotenv").config() // read secret key from .env

// Generate and Sign a JWT Token
const generateAndSignJWT = () => {
    const userId = 123
    const admin = true
    const token = jwt.sign({id: userId, isAdmin: admin}, process.env.SECRET)
    console.log(token)
}

generateAndSignJWT()

let generatedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTI2OTkyMDh9.Z0hpMzyKNu4lqUaJ5PkEPrqpDy6MQTQoQx6lHHBWwBo"
let otherToken = "random string"

const verifyToken = () => {
    try {
        const decodedToken = jwt.verify(generatedToken, process.env.SECRET)
        console.log(decodedToken)
        console.log("Valid Token")
    }
    catch {
        console.log("Invalid Token")
    }
}

verifyToken()