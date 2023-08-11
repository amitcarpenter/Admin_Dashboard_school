const express = require("express")
const { RegisterAdmin, LoginAdmin, loginLoader, dashboardLoader, headerLoader } = require("../controller/adminController")
const session = require('express-session')
const router = express.Router()

//middle ware
router.use(express.json())
router.use(express.urlencoded({extended : true}))


router.get("/" , loginLoader   )

router.post("/register" , RegisterAdmin)

router.post("/login" , LoginAdmin)



router.get("/dashboard", dashboardLoader)

router.get("/header" , headerLoader)

module.exports = router