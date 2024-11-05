// Needed for dotenv
require("dotenv").config();

// Needed for Express
var express = require('express')
var app = express()

// Needed for EJS
app.set('view engine', 'ejs');

// Needed for public directory
app.use(express.static(__dirname + '/public'))

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
        const blogs = await prisma.sleep.findMany({
                orderBy: [
                  {
                    id: 'desc'
                  }
                ]
        });

        // Render the homepage with all the blog posts
        await res.render('Home', { blogs: blogs });
      } catch (error) {
        res.render('Home');
        console.log(error);
      } 
});

// About page
app.get('About', function(req, res) {
    res.render('About');
});

// Sleep page
app.get('Sleep', function(req, res) {
    res.render('Sleep');
});

// Create a new post
app.post('Sleep', async function(req, res) {
    
    // Try-Catch for any errors
    try {
        // Get the title and content from submitted form
        const { Name, Age_range, Gender, Sleep_duration, Sleep_time, Email_adddress } = req.body;

        // Reload page if empty title or content
        if (!Name || !Age_range || !Gender || !Sleep_duration || !Sleep_time || !Email_adddress) {
            console.log("Unable to create new post, no data");
            res.render('Sleep');
        } else {
            // Create sleep and store in database
            const blog = await prisma.Sleep.create({
                data: { Name, Age_range, Gender, Sleep_duration, Sleep_time, Email_adddress },
            });

            // Redirect back to the homepage
            res.redirect('/');
        }
      } catch (error) {
        console.log(error);
        res.render('Sleep');
      }

});

// Delete a post by id
app.post("/delete/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        await prisma.Sleep.delete({
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