# CloudInsight_Dashboard
Spring 2024: 4100-Applied Project Capstone Course 
at Division of Programs in Business
School of Professional Studies
New York University

The CloudInsight Dashboard is designed to provide a comprehensive view of your cloud service performance through an intuitive interface (shown in Figure 1). 

 Here’s what you can expect on the main dashboard:
	Top Section: Displays key performance indicators including average Error Rate, average Latency, and the average recorded Network In/Out values. These metrics provide a snapshot of the overall health and performance of your cloud services. (Figure 2)
 
	Visualization Area:
1.	CPU & Memory Utilization Line Chart: Tracks the utilization rates over time, allowing for trend analysis and peak usage identification. (Figure 3)
 
2.	Disk Operations Line Chart: Compares disk read and write operations over time to help identify potential bottlenecks or spikes in disk usage. (Figure 4)
 
3.	Network and Latency Scatter Chart: Illustrates the correlation between network input and latency, offering insights into how network traffic impacts response times. (Figure 5)
 
4.	Network Traffic Bar Chart: Displays a comparative view of network input and output data over time, useful for monitoring network load and activity. (Figure 6)
 
	Data Table Section: Located in the center below the visualization area, this section lists the latest 50 data entries from the MongoDB database separated into 5 pages (Figure 7). Users could click on the specific page number or ‘Previous’/ ’Next’ buttons to see the following data records. Each row displays detailed metrics such as:
	Time Stamp
	CPU Utilization (%)
	Memory Utilization (%)
	Disk-read Operations
	Disk-write Operations
	Network In (bytes)
	Network Out (bytes)
	Latency (milliseconds)
	Error Rate (%)

 
Interactive Charts: Click on elements within the charts (like points in the scatter plot or bars in the bar chart) to view detailed metric values at specific times.

Data Refresh: The dashboard automatically updates the data table and charts with the latest entries from the MongoDB database. Check the top right of the interface for the last updated timestamp.

