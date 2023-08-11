const Contact = require("../models/contactModels")
const UserContact = require("../models/contact")




const combinedContactLoader = async (req, res) => {
    try {
      const [data, userData] = await Promise.all([Contact.find(), UserContact.find()]);
  
      res.render('contact', { data, userData });
    } catch (error) {
      console.error('Error fetching data', error);
      res.sendStatus(500);
    }
  };
  


const postData = async (req, res) => {
    const { heading, massage, image, bgImage, buttonText, subheading, section } = req.body;
    const newData = new Contact({
        heading,
        massage,
        image,
        bgImage,
        buttonText,
        subheading,
        section
    });

    await newData.save()
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.error('Error saving data', error);
            res.sendStatus(500);
        });
};


//edit data 
const editLoader = async (req, res) => {
    const id = req.params.id;
    await Contact.findById(id)
        .then((data) => {
            res.render('editContact', { data });
        })
        .catch((error) => {
            console.error('Error fetching data for editing', error);
            res.sendStatus(500);
        });
};


//update data
const updateData = async (req, res) => {
    const id = req.params.id;
    const { heading, address, mobile, email } = req.body;
    const image = req.files['image'] ? req.files['image'][0].path : ''; // Check if image exists before accessing properties
    const bgImage = req.files['bgImage'] ? req.files['bgImage'][0].path : '';



    await Contact.findByIdAndUpdate(
        id,
        {
            $set: {
                heading, address, mobile, email, image, bgImage

            }
        }, { new: true })
        .then(() => {
            res.redirect("/contact");
            console.log("updated")
        })
        .catch((error) => {
            console.error('Error updating data', error);
            res.sendStatus(500);
        });
};



// get data 
const getdata = async (req, res) => {
    const data = await Class.find()
    console.log(data)
    res.json({ data })

}




const postFormdataForuser = async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Create a new Contact instance
    const contact = new UserContact({
        name,
        email,
        subject,
        message
    });

    // Save the form submission to the database
    await contact.save()
        .then(savedContact => {
            // Example response
            const response = {
                status: 'success',
                message: 'Form submitted successfully',
                data: savedContact
            };
            res.json(response);
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
            const response = {
                status: 'error',
                message: 'An error occurred while saving the form submission'
            };
            res.status(500).json(response);
        });
};



module.exports = {

    // contactLoader,
    postData,
    editLoader,
    updateData,
    getdata,
    postFormdataForuser,
    // usercontactLoader,
    combinedContactLoader

}