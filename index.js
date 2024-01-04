//jshint esversion:6
const express= require("express");
const bodyParser= require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.get("/", function(req, res){
    res.sendFile(__dirname+ "/index.html");
});

app.post("/", function(req,res){
    const x= req.body.num1;
    if (x==1){
        res.write("<p>Entered value should be greater than 1<p>");
    }
    else{
        const effortO= parseFloat(2.4* (x**1.05)).toFixed(2);
        const effortS= parseFloat(3.0* (x**1.12)).toFixed(2);
        const effortE= parseFloat(3.6* (x**1.20)).toFixed(2);

        const tdevO= parseFloat(2.5* (effortO**0.38)).toFixed(2);
        const tdevS= parseFloat(2.5* (effortS**0.35)).toFixed(2);
        const tdevE= parseFloat(2.5* (effortE**0.32)).toFixed(2);

        const sizeO= parseFloat(effortO/tdevO).toFixed(0);
        const sizeS= parseFloat(effortS/tdevS).toFixed(0);
        const sizeE= parseFloat(effortE/tdevE).toFixed(0);

        res.write("<h1> Estimation of Development Effort (PM) </h1>");
        res.write("<p>Organic: "+effortO+"</p><br/>");
        res.write("<p>Semi- detached: "+effortS+"</p><br/>");
        res.write("<p>Embedded: " +effortE+"</p><br/>");

        res.write("<br/> <h1> Estimation of development Time (Months) </h1>");
        res.write("<p>Organic: "+tdevO+"</p><br/>");
        res.write("<p>Semi- detached: "+tdevS+"</p><br/>");
        res.write("<p>Embedded: " +tdevE+"</p><br/>");

        res.write("<br/> <h1> Average Staff (Persons) </h1>");
        res.write("<p>Organic: "+sizeO+"</p><br/>");
        res.write("<p>Semi- detached: "+sizeS+"</p><br/>");
        res.write("<p>Embedded: " +sizeE+"</p><br/>");

        res.send();
    }
});

app.listen(3000, function(){
    console.log("Server started at port 3000");
});