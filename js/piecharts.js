/*!
 * Start Bootstrap - SB Admin v4.0.0-beta.2 (https://startbootstrap.com/template-overviews/sb-admin)
 * Copyright 2013-2017 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-sb-admin/blob/master/LICENSE)
 */
<<<<<<< HEAD
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif', Chart.defaults.global.defaultFontColor = "#292b2c";
var ctx = document.getElementsByClassName("myPieChart"),
    myPieChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Blue", "Red", "Yellow", "Green"]
,
            datasets: [{
                data: [12.21, 15.58, 11.25, 8.32],
                backgroundColor: ["#007bff", "#dc3545", "#ffc107", "#28a745"]
            }]
        }
    });
=======

 $.ajax({ // retrieve data from server
     type: 'GET',
     url: 'http://localhost:8080/stats_countries.json', // TODO change to production api url
     success: function(data) { // data received -> feed into myPieChart
         Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif', Chart.defaults.global.defaultFontColor = "#292b2c";
         var ctx = document.getElementsByClassName("myPieChart"),
             myPieChart = new Chart(ctx, {
                 type: "pie",
                 data: {
                     labels: data.labels,
                     datasets: [{
                         data: data.data,
                         backgroundColor: data.color
                     }]
                 }
             });

     }
 })
>>>>>>> 89aaf77f4d2e5b7b9619fa74143f91f8dfefd405
