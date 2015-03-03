(function () {
var dateS = new Date(2014,0,1);
var dateE = new Date(2015,0,1);

var availableTags = [
    "GOOG",
    "AAPL",
    "MSFT",
    "IBM",
    "AMZN",
    "EBAY",
    "FB",
    "INTC",
    "CSCO",
    "YHOO",
    "MANU",
    "TWTR",
    "GS"
];

$( "#autocomplete" ).autocomplete({
    source: availableTags
});


$( "#datepicker1" ).datepicker ({
	changeMonth: true,
    changeYear: true,
    onSelect: function(dateText, inst) { 
        start_date = dateText; // save date to variable
        console.log(start_date);
        dateS = $(this).datepicker( 'getDate' );
        $("#r_slider").dateRangeSlider("values",dateS,dateE);
    }
});

$( "#datepicker2" ).datepicker ({
    changeMonth: true,
    changeYear: true,
    onSelect: function(dateText, inst) { 
        end_date = dateText; // save date to variable
        console.log(end_date);
        dateE = $(this).datepicker( 'getDate' );
        $("#r_slider").dateRangeSlider("values",dateS,dateE);
    }
});


var d = new Date();
var d1 = d.getDate();
console.log((dateS-d1));

$("#r_slider").dateRangeSlider({
    range:true,
    bounds:{min:new Date(2014,0,1), max:new Date(2015,0,1)},
    defaultValues:{min:new Date(2014,0,1), max:new Date(2015,0,1)},
});
}).call(this);