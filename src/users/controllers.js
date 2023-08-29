const User = require("./model")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    console.log("Next called and now inside controller registerUser")
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        res.status(201).json({
            message: "Successfully registered",
            user: {username: user.username, email: user.email}
        })
    }
    catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()

        res.status(200).json({
            message: "Success",
            users: users
        })
    }
    catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const searchUsers = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        res.status(200).json({
            message: "Success", 
            user: user
        })
    }
    catch (error) {
        res.status(501).json({message: error.message, error: error})
        console.log(error)
    }
}

const updateUsers = async (req, res) => {
    try {
        const updatedUser = await User.update(
            {
                [req.body.key]: req.body.newKey
            },
            {
                where: {
                    username: req.body.username
                }
            }
        )
        res.status(200).json({
            message: "Success",
            updatedUser: updatedUser
        })
    }
    catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const deleteUsers = async (req, res) => {
    try {
        const deletedUser = await User.destroy({
            where: {
                username: req.body.username
            }
        })
        res.status(200).json({
            message: "Success", deletedUser: deletedUser
        })
    }
    catch (error) {
        res.status(501).json({message: error.message, error: error})
        console.log(error)
    }
}

const deleteAll = async (req, res) => {
    try {
        const deletedUsers = await User.destroy({
            where: {
                
            }
        })
        res.status(200).json({
            message: "Success", 
            deletedUsers: deletedUsers
        })
    }
    catch (error) {
        res.status(501).json({message: error.message, error: error})
        console.log(error)
    }
}

const login = async (req, res) => {
    try{
        // handles persistent login
        if (req.authUser) {
            res.status(200).json({message: "success", 
            user: {
                username: req.authUser.username,
                email: req.authUser.email
            }})
            return
        }
        // handles manual login
        const token = await jwt.sign({id: req.user.id}, process.env.SECRET)
        res.status(200).json({
            message: "Success",
            user: {
                username: req.body.username,
                email: req.body.email,
                token: token
            }
        })
    }
    catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

module.exports = {
    registerUser,
    getAllUsers,
    searchUsers,
    updateUsers,
    deleteUsers,
    deleteAll,
    login
}