const jwt = require('jsonwebtoken')

function Authmiddleware(req, res, next) {
    let token = req.headers.authorization
    if (token) {
        token = token.split(" ")[1]
        jwt.verify(token, 'liasion', function (err, decoded) {
            if (err) {
                res.status(400).send({ message: err.message })
            }
            else if (decoded) {
                  req.body.user=decoded.data.name
                  req.body.userid=decoded.data.userid
                  next()
            }
        });
    }
    else {
        res.status(200).send({ message: "Please Login First" })
    }
}

module.exports = { Authmiddleware }