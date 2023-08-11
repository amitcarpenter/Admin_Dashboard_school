const Blog = require("../models/blogModels")


//Blog loader 
const blogLoader = async (req, res) => {
    try {

        await Blog.find()
            .then((data) => {
                res.render('blog', { data });
            })
            .catch((error) => {
                console.error('Error fetching data', error);
                res.sendStatus(500);
            });
    } catch (error) {
        console.log(error)
    }
}



// Post data Loader
const PostLoader = async (req, res) => {
    try {

        res.render("AddBlog", { currentUrl: req.originalUrl })
    } catch (error) {
        console.log(error)


    }
}

// Add Post
const addPost = async (req, res) => {
    const { title, category, description, createdAt } = req.body;
    const cover = req.files['image'] ? req.files['image'][0].path : '';

    let section = 'Box-1'; // Initial section value
    const lastBlog = await Blog.findOne({}, {}, { sort: { 'createdAt': -1 } }); // Find the last blog entry

    if (lastBlog) {
        // Extract the numeric part of the last section value and increment it
        const lastSectionNumber = parseInt(lastBlog.section.split('-')[1]);
        section = `Box-${lastSectionNumber + 1}`;
    }

    const newData = new Blog({
        section, title, category, description, createdAt, cover
    });

    await newData.save()
        .then(() => {
            res.redirect("/blog");
        })
        .catch((error) => {
            console.error('Error saving data', error);
            res.sendStatus(500);
        });
};


// Post Data
const postData = async (req, res) => {
    const { section, title, category, description, createdAt, comment, cover } = req.body;

    const newData = new Blog({
        section, title, category, description, comment, createdAt, cover
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
    await Blog.findById(id)
        .then((data) => {
            res.render('editBlog', { data });
        })
        .catch((error) => {
            console.error('Error fetching data for editing', error);
            res.sendStatus(500);
        });
};


//update data
const updateData = async (req, res) => {
    const id = req.params.id;
    const { section, title, category, description, authorName } = req.body;

    const newCover = req.files['image'] ? req.files['image'][0].path : ''; // Get the new uploaded image path

    // Retrieve existing blog data from the database
    const existingBlog = await Blog.findById(id);

    // Check if a new image is uploaded
    const cover = newCover ? newCover : existingBlog.cover; // Use new cover if available, otherwise retain existing cover

    await Blog.findByIdAndUpdate(
        id,
        {
            $set: {
                section, title, category, description, authorName, cover
            }
        },
        { new: true }
    )
    .then(() => {
        res.redirect("/blog");
        console.log("updated");
    })
    .catch((error) => {
        console.error('Error updating data', error);
        res.sendStatus(500);
    });
};


// Get paginated blogs with search
const getBlogs = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    try {
        // Retrieve paginated blog posts sorted by createdAt in descending order
        const blogs = await Blog.find({ title: { $regex: search, $options: 'i' } })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalBlogs = await Blog.countDocuments({ title: { $regex: search, $options: 'i' } });

        res.json({
            totalPages: Math.ceil(totalBlogs / limit),
            blogs,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};



// get data 
const getdata = async (req, res) => {
    const data = await Blog.find()
    console.log(data)
    res.json({ data })

}




// Get Api data 

const getDatawithPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        // Retrieve paginated blog posts sorted by createdAt in descending order
        const blogs = await Blog.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}



const postPageData = async (req, res) => {
    const {
        section,
        title,
        category,
        description,
        authorName,
        comment,
        cover
    } = req.body;

    try {
        // Create a new blog post with the provided data
        const blog = await Blog.create({
            section,
            title,
            category,
            description,
            authorName,
            comment,
            cover
        });

        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}



const viewButton = async (req, res) => {
    try {
      const blogId = req.params.id;
      const blog = await Blog.findById(blogId);
      console.log(blog)
      
      // Render the blog.ejs template with the retrieved blog data
      res.render('blog-view', { data: blog });
      console.log(blog) 
    } catch (error) {
      console.error('Error fetching blog post', error);
      res.sendStatus(500);
    }
  };
  
  


// const blogController = async (req, res) => {
//     try {
//         if (req.params.id) {
//             // View a specific blog post
//             const blogId = req.params.id;
//             const blog = await Blog.findById(blogId);
//             res.render('blog-view', { blog });
//         } else {
//             // Load the blog page
//             const blogs = await Blog.find();
//             res.render('blog', { blogs });
//         }
//     } catch (error) {
//         console.error('Error fetching blog data', error);
//         res.sendStatus(500);
//     }
// };


const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
    
        // Perform the deletion logic here, such as deleting the blog from the database
        await Blog.findByIdAndDelete(blogId);
    
        // Redirect to the main blog page
        res.redirect('/blog');
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
  };

module.exports = {

    blogLoader,
    postData,
    editLoader,
    updateData,
    getdata,
    getDatawithPage,
    postPageData,
    getBlogs,
    PostLoader,
    addPost,
    viewButton,
    deleteBlog, 
    // blogController,
}