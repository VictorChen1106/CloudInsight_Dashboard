const mongoose = require('../connect');

const metricSchema = new mongoose.Schema({

    timeStamp: { type: Date, default: Date.now },
    cpuUtilization: { type: Number, required: true }, //Percentage as a number, e.g. 75 for 75%
    memoryUtilization: { type: Number, required: true },
    diskReadOps: { type: Number, required: true }, //Number of operations
    diskWriteOps: { type: Number, required: true },
    networkIn: { type: Number, required: true },// Bytes
    networkOut: { type: Number, required: true },
    latency: { type: Number, required: true },// Milliseconds
    errorRate: { type: Number, required: true } //Percentage as a number

});

const MetricModel = mongoose.model('Metric', metricSchema);
module.exports = MetricModel;

