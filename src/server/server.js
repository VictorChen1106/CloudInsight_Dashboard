const express = require('express');
//imports the Express library, which is used to create the server and define API routes.

const mongoose = require('./connect');
//responsible for setting up and maintaining the MongoDB connection.

const metricRoutes = require('./routes/metricRoutes');
//Imports routing logic contains definitions for routes related to "metrics"

const cors = require('cors');
//enable Cross-Origin Resource Sharing, allows the server to accept requests from different domains

const app = express()
// Initialize Express Application, This app object is used to configure the server, set up middleware, and define routes.



app.use(cors()); //Applies the CORS middleware to all incoming requests

app.use(express.json()); //tells the Express app to use middleware that automatically parses JSON formatted request bodies.

app.use('/api', metricRoutes)
//mounts the 'metricRoutes' module at the '/api' path prefix.
//helps organize and namespace API endpoints.

app.listen(3000, () => console.log('Server is running on port 3000'));
//starts the server and makes it listen on port 3000