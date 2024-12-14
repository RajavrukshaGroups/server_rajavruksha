const express=require("express")
const router=express.Router()
const contactController=require("../controlller/contactController")

router.post('/savecontact',contactController.saveContactDetails)
