var http = require('http');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    var cars = [
        {carName: "Nissan Skyline R34", carModel:"DCT", manufacuringYear: 1998, price: 150000, lastServiceDate: 2020-03-12},
        {carName: "Toyota Supra", carModel:"DCT", manufacuringYear: 1994, price: 5550000, lastServiceDate: 2020-01-19},
        {carName: "Honda Civic", carModel:"DCT", manufacuringYear: 2004, price: 2080000, lastServiceDate: 2019-03-30},
        {carName: "Mazda Rx7", carModel:"DCT", manufacuringYear: 1987, price: 4840000, lastServiceDate: 2018-03-04},
        {carName: "Mitsubishi Evo", carModel:"DCT", manufacuringYear: 1996, price: 2150000, lastServiceDate: 2019-03-10},
        {carName: "Nissan GTR", carModel:"CVT", manufacuringYear: 2008, price: 21150000, lastServiceDate: 2020-12-15},
        {carName: "BMW M4", carModel:"CVT", manufacuringYear: 2012, price: 15340000, lastServiceDate: 2020-06-22},
        {carName: "Mercedes AMG Gt", carModel:"CVT", manufacuringYear: 2014, price: 24380000, lastServiceDate: 2020-07-07},
        {carName: "Audi RS7", carModel:"CVT", manufacuringYear: 2016, price: 36040000, lastServiceDate: 2020-06-25},
        {carName: "BMW 750li", carModel:"CVT", manufacuringYear: 2019, price: 27500000, lastServiceDate: 2021-01-12}
        ]
    res.write("Number Of Cars:- " + cars.length + "<br/>")
        
    cars.forEach(car => {
        if (car.manufacuringYear > 2012) {
            res.write("<br/>" + "Name:-" + car.carName +"  Model:- " + car.carModel)        
        }
    });
        
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth();
    var d = date.getDate();
    res.write("<br/>" + "<br/>" + "Today's Date and Time is:- " + date);
    var lastMonthFull = new Date(y, m-1, d);
    var lastDayFull = new Date(y, m + 2, 0);
    var lastDayOnly = new Date(y, m + 2, 0).getDate();
    
    res.write("<br/>" + "Previous Month with date and year:- "+ lastMonthFull) + "<br/>";
    res.write("<br/>" + "Last Date of next month with month and year:- " + lastDayFull);
    res.write("<br/>" + "Last Date for next month is:- " + lastDayOnly + "<br/>");
    res.end();
}).listen(8000);