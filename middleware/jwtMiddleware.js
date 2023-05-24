const jwt = require('jsonwebtoken')

const secretKey = "sheraz"

const jwtAuthorization = {
    sign(payload){
    const token = jwt.sign(payload,secretKey)
    return token
    }
}


module.exports = jwtAuthorization