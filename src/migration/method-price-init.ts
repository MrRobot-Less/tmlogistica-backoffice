import MethodPrice, { MethodPriceDTO } from "../models/method-price";
var mockMethodPrice : MethodPriceDTO[]  = require('./data/method-price.json');

var chain = Promise.resolve();
mockMethodPrice.map(mock => {
	chain = chain.then(() => new Promise(resolve => {
		console.log('+1');
		MethodPrice.create(mock).then(() => resolve());
	}));
});

chain.then(() => {
	console.log('Migrate MethodPrice Model with initials values');
});