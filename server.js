// Import required modules
const express = require('express');
const path = require('path');

// Create an instance of Express
const app = express();

// Define the port where your server will listen
const port = 3000;

// Set the static folder for serving HTML, CSS, and JavaScript files
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});
