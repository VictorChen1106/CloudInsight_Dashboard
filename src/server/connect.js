const mongoose = require('mongoose');
// const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://tc3734:cty2011CTY@cluster0.quzs2sa.mongodb.net/cloudPerformanceMetrics?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Successfully connected to Atlas with Mongoose"))
    .catch((err) => {
        console.error('Database connection error', err);
    });

module.exports = mongoose;