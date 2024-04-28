const mongoose = require('../connect');

const MetricModel = require('../models/metric');

const seedMetric = new MetricModel({

    cpuUtilization: 75,
    memoryUtilization: 60,
    diskReadOps: 150,
    diskWriteOps: 200,
    networkIn: 102400,
    networkOut: 204800,
    latency: 100,
    errorRate: 1.5

});

seedMetric.save()
    .then((doc) => {
        console.log('Seed Metric Saved:', doc);
    })
    .catch((err) => {
        console.error('Error Saving Seed Metric:', err);
    });


