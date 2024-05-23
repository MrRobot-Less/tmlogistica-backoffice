import Coverage, { CoverageDTO } from "../models/coverage";
var mockCoverage : CoverageDTO[]  = require('../../data/coverage.json');

var chain = Promise.resolve();
mockCoverage.map(mock => {
	chain = chain.then(() => new Promise(resolve => {
		console.log('+1');
		Coverage.create(mock).then(() => resolve());
	}));
});

chain.then(() => {
	console.log('Migrate Coverage Model with initials values');
});