const mongoose = require('../connect');
const MetricModel = require('../models/metric');

const generateData = (numRecords) => {
    let data = [];
    let baseTime = Date.now();
    let timeIncrement = 1000 * 60 * 60 * 60 // Start with one minute in milliseconds

    for (let i = 0; i < numRecords; i++) {
        //plus an additional 0 to 30 seconds each iteration
        timeIncrement += Math.floor(Math.random() * 30) * 1000 * 60;
        const timestamp = new Date(baseTime + timeIncrement);

        const record = {
            // timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
            timestamp,
            cpuUtilization: parseFloat((Math.random() * (90 - 10) + 10).toFixed(2)),
            memoryUtilization: parseFloat((Math.random() * (90 - 10) + 10).toFixed(2)),
            diskReadOps: Math.floor(Math.random() * (1000 - 100) + 100),
            diskWriteOps: Math.floor(Math.random() * (1000 - 100) + 100),
            networkIn: Math.floor(Math.random() * (10000 - 1000) + 1000),
            networkOut: Math.floor(Math.random() * (10000 - 1000) + 1000),
            latency: Math.floor(Math.random() * (100 - 1) + 1),
            errorRate: parseFloat((Math.random() * 5).toFixed(2))
        };
        data.push(record);
        baseTime += timeIncrement;
    }
    return data;
};

const data = generateData(100); //Generate 100 records

MetricModel.insertMany(data)
    .then((doc) => {
        console.log('Data inserted', doc);
        mongoose.disconnect();
    })
    .catch(err => {
        console.error('Error inserting data:', err)
    });
