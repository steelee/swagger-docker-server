// Load the Visualization API and the corechart package.
google.charts.load('current', {
    'packages': ['corechart']
});

// Set a callback to run after the Google Visualization API has been loaded.
google.charts.setOnLoadCallback(
    function() { // Anonymous function that calls drawChart1, drawChart2, drawChart3, and drawChart4
        drawChart1()
        drawChart2();
        drawChart3();
        drawChart4();
    }
);

function drawChart1() {
    // Create the data for table1.
    var data1 = new google.visualization.DataTable();
    data1.addColumn('string', 'Year');
    data1.addColumn('number', '# of APIs');
    data1.addRows(
        [
            ['FY2014', 20],
            ['FY2015', 152],
            ['FY2016', 195]
        ]);

    // Set chart options
    var options1 = {
        'title': 'Total Number of APIs',
        'width': 500,
        'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart1 = new google.visualization.ColumnChart(document.getElementById('chart1_div'));
    chart1.draw(data1, options1);
}

function drawChart2() {
    // Create the data for table2.
    var data2 = new google.visualization.DataTable();
    data2.addColumn('string', 'Year');
    data2.addColumn('number', '# API\'s Consumed');
    data2.addRows(
        [
            ['FY2014', 486],
            ['FY2015', 2308],
            ['FY2016', 4020]
        ]);

    // Set chart options
    var options2 = {
        'title': 'Number of Times APIs Were Consumed',
        'width': 500,
        'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart2 = new google.visualization.LineChart(document.getElementById('chart2_div'));
    chart2.draw(data2, options2);
}

function drawChart3() {
    // Create the data for table3.
    var data3 = new google.visualization.DataTable();
    data3.addColumn('string', 'Year');
    data3.addColumn('number', 'API\'s Built');
    data3.addRows(
        [
            ['FY2014', 11],
            ['FY2015', 31],
            ['FY2016', 41]
        ]);

    // Set chart options
    var options3 = {
        'title': 'Number of Strategic APIs Built',
        'width': 500,
        'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart3 = new google.visualization.ColumnChart(document.getElementById('chart3_div'));
    chart3.draw(data3, options3);
}

function drawChart4() {
    // Create the data for table4.
    var data4 = new google.visualization.DataTable();
    data4.addColumn('string', 'Status');
    data4.addColumn('number', 'Maturity');
    data4.addRows(
        [
            ['Planned', 23],
            ['Walk', 10],
            ['Run', 17],
            ['Fly', 8]
        ]);

    // Set chart options
    var options4 = {
        title: 'Status of API Maturity',
        pieHole: 0.4
    };

    // Instantiate and draw our chart, passing in some options.
    var chart4 = new google.visualization.PieChart(document.getElementById('chart4_div'));
    chart4.draw(data4, options4);
}
