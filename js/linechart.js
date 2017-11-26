// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
// -- Area Chart Example


// retrieve data form server
$.ajax({
    type: 'GET',
    url: '/v1/stats/servers', // TODO change to production api url
	dataType: 'json',
    success: function(data) { // data received -> feed chart
        console.log(data);
        var dates = [];
        var counts = [];
        for(var i = 0; i<data.dataPoints.length; i++) { // strap datapoint objects to two separate arrays
            dates.push(data.dataPoints[i].date);
            counts.push(data.dataPoints[i].serversVisited);
        }
        buildChart(dates, counts);
    }
});

function buildChart(dates, counts) {
    var maximumCount = Math.max(...counts);
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: "Sessions",
                lineTension: 0.3,
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                pointHitRadius: 20,
                pointBorderWidth: 2,
                data: counts,
        }],
        },
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 7
                    }
          }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: maximumCount,
                        maxTicksLimit: 5
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, .125)",
                    }
          }],
            },
            legend: {
                display: false
            }
        }
    });
}
