const express = require('express');
const cors = require("cors");
const bodyParser =  require('body-parser');
const Razorpay = require("razorpay");
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));

var instance = new Razorpay(
{   
    key_id: 'rzp_test_dQHezSiu0Ff6yD', 
    key_secret: 'b3ibOjTC1QD3lX99pqxR0l5c' 
})
app.post('/order',(request,response)=>{
    instance.orders.create(
        {   amount: 50000,  
            currency: "INR",
    },(err ,order)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(order);
            response.status(200).json(order)
        }
    })
    
});
app.post('/order-status',(request,response)=>{
    instance.payments.fetch(request.body.razorpay_payment_id)
    .then((orderDetails)=>{
        console.log(orderDetails);
        response.send("payment Success");
    })
})

app.listen(3000,()=>{
    console.log("server running");
})