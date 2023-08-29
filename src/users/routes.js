const {Router} = require("express")

const {hashPass, comparePass, tokenCheck} = require("../middleware/index")

const userRouter = Router()

const {registerUser, getAllUsers, searchUsers, updateUsers, deleteUsers, deleteAll, login} = require("./controllers")

userRouter.post("/users/registerUser", hashPass, registerUser)
userRouter.get("/users/getAllUsers", tokenCheck, getAllUsers) // protected endpoint
userRouter.get("/users/searchUsers", searchUsers)
userRouter.put("/users/updateUsers", updateUsers)
userRouter.delete("/users/deleteUsers", deleteUsers)
userRouter.delete("/users/deleteAll", deleteAll)
userRouter.post("/users/login", comparePass, login)
userRouter.get("/users/authCheck", tokenCheck, login) // persistent login

module.exports = userRouter