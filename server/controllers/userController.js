const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const ApiError = require('../utils/ApiError')


async function getAll(req, res, next) {

    try {
        const users = await User.findAll()
        return res.json(users)
    } catch (error) {
        return next(ApiError.badRequest(error.message))
    }

}

async function getOne(req, res, next) {

    const { id } = req.params
    try {
        const user = await User.findOne({ where: { id } })
        return res.json(user)
    } catch (error) {
        return next(ApiError.badRequest(error.message))
    }
}

async function create(req, res, next) {

    const { login, password } = req.body

    try {

        let user
        user = await User.findOne({ where: { login } })
        if (user) {
            return res.json(ApiError.badRequest('that user is already exist'))
        }

        const hashedPassword = await bcrypt.hash(password, 5)
        user = await User.create({ ...req.body, password: hashedPassword })
        return res.json(user)

    } catch (error) {
        next(ApiError.badRequest(error.message))
    }

}

async function login(req, res, next) {

    const { login, password } = req.body
    const user = await User.findOne({ where: { login } })
    if (!user) {
        return next(ApiError.badRequest('user not found'))
    }
    const isMatched = await bcrypt.compare(password, user.password)
    if (isMatched) {
        const token = jwt.sign({ login, fullName: user.fullName, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' })
        return res.json(token)
    } else {
        return next(ApiError.badRequest('wrong password'))
    }
}

module.exports.getAll = getAll
module.exports.getOne = getOne
module.exports.create = create
module.exports.login = login