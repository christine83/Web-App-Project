// Needed for dotenv
require("dotenv").config();

// Needed for Express
var express = require('express')
var app = express()

// Needed for EJS
app.set('view engine', 'ejs');

// Needed for public directory
app.use(express.static(__dirname + '/public'));

// Needed for parsing form data
app.use(express.json());       
app.use(express.urlencoded({extended: true}));

// Needed for Prisma to connect to database
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// Main landing page
app.get('/', async function(req, res) {

    // Try-Catch for any errors
    try {
        // Get all blog posts
        const blogs = await prisma.post.findMany({
                orderBy: [
                  {
                    id: 'desc'
                  }
                ]
        });

        // Render the homepage with all the blog posts
        await res.render('pages/Home', { blogs: blogs });
      } catch (error) {
        res.render('pages/Home');
        console.log(error);
      } 
});

// Home page
app.get('/Home', function(req, res) {
  res.render('pages/Home');
});

// About page
app.get('/About', function(req, res) {
    res.render('pages/About');
});

// Food page
app.get('/Food', function(req, res) {
  res.render('pages/Food');
});

// Sleep page
app.get('/Sleep', function(req, res) {
    res.render('pages/Sleep');
});

// Exercise page
app.get('/Exercise', function(req, res) {
  res.render('pages/Exercise');
});

// Demo page
//app.get('/demo', async function(req, res) {

 // var blog_posts = await prisma.post.findMany();
 // console.log(blog_posts);

 // res.render('pages/demo', {blog_posts: blog_posts});
//});

// Create a new post
app.post('/Sleep', async function(req, res) {
    
    // Try-Catch for any errors
    try {
        // Get the title and content from submitted form
        const { Name, Age_range, Gender, Sleep_duration, Sleep_time, Email_address } = req.body;

        // Reload page if empty title or content
        if (!Name || !Age_range || !Gender || !Sleep_duration || !Sleep_time || !Email_address ) {
            console.log("Unable to create new post, no inputs");
            res.render('pages/Sleep');
        } else {
            // Create post and store in database
            const blog = await prisma.post.create({
                data: { Name, Age_range, Gender, Sleep_duration, Sleep_time, Email_address},
            });

            // Redirect back to the homepage
            res.redirect('/');
        }
      } catch (error) {
        console.log(error);
        res.render('pages/Sleep');
      }

});

// Delete a post by id
app.post("/delete/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        await prisma.post.delete({
            where: { id: parseInt(id) },
        });
      
        // Redirect back to the homepage
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
  });

// Tells the app which port to run on
app.listen(8080);