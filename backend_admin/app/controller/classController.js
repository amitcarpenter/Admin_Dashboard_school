const Class = require("../models/classModels")





// Class Loader
const classLoader = async (req, res) => {
    try {
        await Class.find()
            .then((data) => {
                res.render('class', { data });
            })
            .catch((error) => {
                console.error('Error fetching data', error);
                res.sendStatus(500);
            });

    } catch (error) {
        console.log(error)
    }

}



// Post data 
const postData = async (req, res) => {
    const { heading, massage, image, bgImage, buttonText, section } = req.body;
    const newData = new Class({
        heading,
        massage,
        image,
        bgImage,
        buttonText,
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


// Edit Form Loader
const editLoader = async (req, res) => {
    const id = req.params.id;
    await Class.findById(id)
        .then((data) => {
            res.render('editClass', { data });
        })
        .catch((error) => {
            console.error('Error fetching data for editing', error);
            res.sendStatus(500);
        });
};


// Updata Data
// const updateData = async (req, res) => {
//     const id = req.params.id;
//     const { section, heading, subheading, massage, buttonText, content1Input1, content1Input2, content2Input1, content2Input2, content3Input1, content3Input2 } = req.body;
//     const image = req.files['image'] ? req.files['image'][0].path : ''; // Check if image exists before accessing properties
//     const bgImage = req.files['bgImage'] ? req.files['bgImage'][0].path : '';

//     await Class.findByIdAndUpdate(
//         id,
//         {
//             $set: {
//                 section, heading, subheading, massage, buttonText, content1Input1, content1Input2, content2Input1, content2Input2, content3Input1, content3Input2
//             }
//         }, { new: true })
//         .then(() => {
//             res.redirect("/class");
//             console.log("updated")
//         })
//         .catch((error) => {
//             console.error('Error updating data', error);
//             res.sendStatus(500);
//         });
// };



const updateData = async (req, res) => {
    const id = req.params.id;
    const { section, heading, subheading, massage, buttonText, content1Input1, content1Input2, content2Input1, content2Input2, content3Input1, content3Input2 } = req.body;
    const image = req.files['image'] ? req.files['image'][0].path : ''; // Check if image exists before accessing properties
    const bgImage = req.files['bgImage'] ? req.files['bgImage'][0].path : '';


    // Retrieve existing blog data from the database
    const existingBlog = await Class.findById(id);

    // Check if a new image is uploaded
    const cover = image ? image : existingBlog.image; // Use new cover if available, otherwise retain existing cover
    const bgImages = bgImage ? bgImage : existingBlog.bgImage; // Use new cover if available, otherwise retain existing cover

    await Class.findByIdAndUpdate(
        id,
        {
            $set: {
                section, heading, subheading, massage, buttonText, content1Input1, content1Input2, content2Input1, content2Input2, content3Input1, content3Input2
            }
        }, { new: true })
        .then(() => {
            res.redirect("/class");
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


module.exports = {
    classLoader,
    updateData,
    editLoader,
    postData,
    getdata,
}