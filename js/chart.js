(function draw_chart() {
    var dt = [["Date", "EPS"]];
    var n = 0;
    var x;
    var stuff = 
    {"entity":
    {"e":"TATimeSeries","w":{"Tickers":["GOOG.O"],"NoInfo":true,"Interval":"Daily","IntervalMultiplier":1,"DateRangeMultiplier":1,"StartDate":"2014-01-01T00:00:00","EndDate":"2014-09-20T00:00:00"}}};

    $(document).ready(function() {
        $.ajax({
            url: 'https://amers1.proxy.cp.reutest.com/msf/auth/login',
            type: 'POST',
            headers: {
                'Authorization': "Basic"+btoa("eikonstudent12@thomsonreuters.com:Secret123")  // ADD YOUR OWN CREDENTIALS
            },
            success: handleSuccess,
            error: handleError,
            complete: handleComplete,
            async: false
        });
    });


    function handleSuccess(data, textStatus, jqXHR) {
        // console.log(data, textStatus, jqXHR);
    }

    function handleError(jqXHR, textStatus, err) {
        // console.log(jqXHR, textStatus, err);
    }

    function handleComplete() {
        $.ajax({
            url: 'https://amers1.proxy.cp.reutest.com/msf',
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify(stuff),
            dataType: 'json',
            success: handleSuccessData,
            error: handleError,
            async: false
        });
    }

    function handleSuccessData (data) {
        console.log("Json object returned from API: STUFF")
        console.log(data); // output from queries
        x = [];
        y = [];
        
        n = data.R[0].Data.length;
        for (i=0; i < data.R[0].Data.length; i++) { 
            x[i] = data.R[0].Data[i].Date ; 
            y[i] = data.R[0].Data[i].High ;                 
        }
        console.log(n);
        for(i=0;i<n;i++) {
                console.log(y[i]);
                console.log(x[i]);
                var tmp = x[i].toString().substr(5,5);
                dt.push([tmp,parseFloat(y[i])]);
            }
    }


    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawChart);


    function drawChart() {
        
        var data = google.visualization.arrayToDataTable(dt);
                        
        var options = {
            title: 'Earnings Per Share',
            legend: 'none'
        };
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}).call(this);
     