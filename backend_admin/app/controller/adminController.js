const Admin = require("../models/adminModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")




// Register Admin
const RegisterAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        let admin = await Admin.findOne({ email })
        if (admin) {
            res.status(200).send("Admin already ")

        }
        const hashedpassword = await bcrypt.hash(password, 10)
        admin = await Admin.create({
            email,
            password: hashedpassword
        })
        res.status(201).json({
            success: true,
            admin
        })


    } catch (error) {
        console.log(error)
    }
}

//Login Loader 
const loginLoader = async (req, res) => {
    try {

        res.render('login')

    } catch (error) {
        console.log(error)
    }
}

// Login Admin
const LoginAdmin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, "dfa", password)

    try {
        // Find the admin user in the database
        const admin = await Admin.find({ email, password }).exec();

        if (!admin) {
            return res.status(401).send('Invalid username or password');
        }

        // Store the admin user in the session
        req.session.admin = admin._id;

        // Redirect to the admin dashboard
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};



//email - admin@gmail.com
//pass - admin



//Dashboard loader 
const dashboardLoader = async (req, res) => {
    try {
        res.render("dashboard")
    } catch (error) {
        console.log(error)
    }

}


// Class Loader
const classLoader = async (req, res) => {
    try {
        const id =
            res.render("class")
    } catch (error) {
        console.log(error)
    }
}



// Blog Loader    
const blogLoader = async (req, res) => {
    try {

        res.render("blog")
    } catch (error) {
        console.log(error)
    }


}


// Blog detail Loader    
const blogDetailLoader = async (req, res) => {
    try {

        res.render("blog-detail")
    } catch (error) {
        console.log(error)
    }


}

// Elements  Loader    
const ElementLoader = async (req, res) => {
    try {

        res.render("element")
    } catch (error) {
        console.log(error)
    }


}


// About Loader    
const contactLoader = async (req, res) => {
    try {

        res.render("contact")
    } catch (error) {
        console.log(error)
    }


}


//Header Loader 
const headerLoader = async (req, res) => {

    try {
        res.render("header")
    } catch (error) {
        console.log(error)

    }

}






module.exports = {
    RegisterAdmin,
    LoginAdmin,
    loginLoader,
    headerLoader,
    dashboardLoader,
    contactLoader,
    ElementLoader,
    blogDetailLoader,
    blogLoader,
    classLoader,
}