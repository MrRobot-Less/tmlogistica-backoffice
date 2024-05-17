import Shipping, { ShippingDTO } from "../models/shipping";
var mockShipping : ShippingDTO[]  = require('./data/shipping.json');

var chain = Promise.resolve();
mockShipping.map(mock => {
	chain = chain.then(() => new Promise(resolve => {
		console.log('+1');
		Shipping.create(mock).then(() => resolve());
	}));
});

chain.then(() => {
	console.log('Migrate Shipping Model with initials values');
});