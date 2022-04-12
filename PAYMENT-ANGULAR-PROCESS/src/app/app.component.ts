import { Component } from '@angular/core';
import {PaymentService} from './payment.service'
declare let Razorpay:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  amount:any;
  constructor(private service:PaymentService){}
  onClick(){
    return this.service.payment(this.amount).subscribe((data:any)=>{
      console.log(data);
      console.log(data.id);
      var options = {
        "key": "rzp_test_dQHezSiu0Ff6yD", // Enter the Key ID generated from the Dashboard
        "amount": "500", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Acme Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id":data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "http://localhost:3000/order-status",
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        }, 
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    })
  }
}

