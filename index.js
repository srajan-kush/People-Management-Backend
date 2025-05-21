const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/people_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Main route - Project Information
app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>People Management System API</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 {
                color: #2c3e50;
                border-bottom: 2px solid #3498db;
                padding-bottom: 10px;
            }
            h2 {
                color: #2c3e50;
                margin-top: 30px;
            }
            .endpoint {
                background-color: #f8f9fa;
                padding: 15px;
                margin: 10px 0;
                border-radius: 5px;
                border-left: 4px solid #3498db;
            }
            .method {
                display: inline-block;
                padding: 5px 10px;
                border-radius: 3px;
                color: white;
                font-weight: bold;
                margin-right: 10px;
            }
            .get { background-color: #2ecc71; }
            .post { background-color: #3498db; }
            .put { background-color: #f1c40f; }
            .delete { background-color: #e74c3c; }
            .features {
                list-style-type: none;
                padding: 0;
            }
            .features li {
                padding: 8px 0;
                border-bottom: 1px solid #eee;
            }
            .features li:last-child {
                border-bottom: none;
            }
            .request-body {
                background-color: #f8f9fa;
                padding: 10px;
                border-radius: 5px;
                margin-top: 10px;
            }
            .field {
                margin: 5px 0;
            }
            .required {
                color: #e74c3c;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>People Management System API</h1>
            <p>A RESTful API built with Node.js and MongoDB for managing people records</p>
            <p><strong>Version:</strong> 1.0.0</p>

            <h2>Available Endpoints</h2>
            
            <div class="endpoint">
                <span class="method get">GET</span>
                <strong>/</strong>
                <p>Display project information and available endpoints</p>
            </div>

            <div class="endpoint">
                <span class="method get">GET</span>
                <strong>/person</strong>
                <p>Get all people records</p>
            </div>

            <div class="endpoint">
                <span class="method post">POST</span>
                <strong>/person</strong>
                <p>Create a new person record</p>
                <div class="request-body">
                    <h4>Request Body:</h4>
                    <div class="field"><strong>name</strong> <span class="required">(required)</span> - String</div>
                    <div class="field"><strong>age</strong> <span class="required">(required)</span> - Number (min: 0)</div>
                    <div class="field"><strong>gender</strong> <span class="required">(required)</span> - String (enum: ['Male', 'Female', 'Other'])</div>
                    <div class="field"><strong>mobileNumber</strong> <span class="required">(required)</span> - String (10 digits)</div>
                </div>
            </div>

            <div class="endpoint">
                <span class="method put">PUT</span>
                <strong>/person/:id</strong>
                <p>Update an existing person record</p>
                <div class="request-body">
                    <h4>Request Body (all fields optional):</h4>
                    <div class="field"><strong>name</strong> - String</div>
                    <div class="field"><strong>age</strong> - Number (min: 0)</div>
                    <div class="field"><strong>gender</strong> - String (enum: ['Male', 'Female', 'Other'])</div>
                    <div class="field"><strong>mobileNumber</strong> - String (10 digits)</div>
                </div>
            </div>

            <div class="endpoint">
                <span class="method delete">DELETE</span>
                <strong>/person/:id</strong>
                <p>Delete a person record</p>
            </div>

            <h2>Features</h2>
            <ul class="features">
                <li>✓ CRUD operations for people records</li>
                <li>✓ Input validation</li>
                <li>✓ Error handling</li>
                <li>✓ MongoDB integration</li>
                <li>✓ CORS support</li>
                <li>✓ Environment variable configuration</li>
                <li>✓ Timestamps for created/updated records</li>
            </ul>

            <h2>Documentation</h2>
            <p>For detailed documentation, please refer to the README.md file</p>
        </div>
    </body>
    </html>
    `;
    
    res.send(html);
});

// Routes
const personRoutes = require('./routes/person.routes');
app.use('/person', personRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 