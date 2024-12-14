const express = require("express")
const router = express.Router()

const usersController = require("../controlller/userController")

router.get("/careers",usersController.index);


module.exports = router;