const express = require("express")
const { RegisterAdmin, LoginAdmin, loginLoader, dashboardLoader, headerLoader, profileLoader, updateProfile, getProfileData, logout, register } = require("../controller/adminController")
const session = require('express-session')
const router = express.Router()

const multer = require('multer');
const path = require('path')

// Muleter use for Upload file 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});
const upload = multer({ storage: storage });

//middle ware
router.use(express.json())
router.use(express.urlencoded({extended : true}))


router.get("/" , loginLoader   )
router.get("/register" , register   )

router.post("/register" , RegisterAdmin)

router.post("/login" , LoginAdmin)



router.get("/dashboard", dashboardLoader)

router.get("/header" , headerLoader)

// router.get("/editProfile" , profileLoader)

router.get("/editProfile" ,getProfileData )



router.get("/logout" , logout)

module.exports = router