const express = require('express') 
const bodyparser = require('body-parser') 
const path = require('path') 
const app = express() 

var Publishable_Key = 'pk_test_51L0vEzDjx4QOpJ22C9T8lcYNss9g6viO1382VSv096t4MiZ7Y4CO5GguDHZf9LP0Hxm3VC92DHLNHX4WBX7BBEpt003irItIuf'
var Secret_Key = 'sk_test_51L0vEzDjx4QOpJ22GiTDEFCAAgns0zG08m1IbiuI4kqIJuhuO88eYiBYky38pOrTq0DvQuUQ12HfDZSL3SHzBTdc00ma5Ix57z'

const stripe = require('stripe')(Secret_Key) 

const port = process.env.PORT || 3000 

app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 

// View Engine Setup 
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

app.get('/', function(req, res){ 
	res.render('Home', { 
	key: Publishable_Key 
	}) 
}) 

app.post('/payment', function(req, res){ 

	// Moreover you can take more details from user 
	// like Address, Name, etc from form 
	stripe.customers.create({ 
		email: req.body.stripeEmail, 
		source: req.body.stripeToken, 
		name: 'John Lennon', 
		address: { 
			line1: 'Stevens Hoboken', 
			postal_code: '09803', 
			city: 'Hoboken', 
			state: 'NJ', 
			country: 'USA', 
		} 
	}) 
	.then((customer) => { 

		return stripe.charges.create({ 
			amount: 7000,	 // Charing 70.00 
			description: 'ride payment', 
			currency: 'USD', 
			customer: customer.id 
		}); 
	}) 
	.then((charge) => { 
		res.send("Success") // If no error occurs 
		//console.log(charge);
	}) 
	.catch((err) => { 
		res.send(err)	 // If some error occurs 
	}); 
}) 

app.listen(port, function(error){ 
	if(error) throw error 
	console.log("Server created Successfully") 
}) 
