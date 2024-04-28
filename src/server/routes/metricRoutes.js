const express = require('express');
const router = express.Router();
const MetricModel = require('../models/metric');

router.get('/metrics', async (req, res) => {
    const all = req.query.all === 'true';  // Check if 'all' parameter is set to true
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    // const { page = 1, limit = 10 } = req.query; // Handle query parameters with defaults
    // const finalLimit = parseInt(limit);
    // const pageIndex = parseInt(page);
    try {
        const latestMetrics = await MetricModel.find()
            .sort({ timeStamp: -1 })
            .limit(50);

        const metricsReturn = all ? latestMetrics : latestMetrics.slice((page - 1) * limit, page * limit);
        // const metrics = await MetricModel.find()
        //     .sort({ timestamp: -1 }) // Sort by timestamp descending
        //     .limit(50) // Limit to fetch only the latest 50 records
        //     .skip((page - 1) * limit) // Skip for pagination
        //     .limit(limit) // Limit the number of records returned

        res.json({
            metrics: metricsReturn,
            totalPages: all ? 1 : Math.ceil(latestMetrics.length / limit),
            currentPage: page
        });
        console.log('Response Data', {
            metrics: metricsReturn,
            totalPages: Math.ceil(latestMetrics.length / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

module.exports = router;