import mongoose from "../database";

export interface MethodPriceDTO {
	_id: string;
	initialPostalCode: number;
	finalPostalCode: number;
	digit: number;
	type: string;
}

export interface MethodPriceFormat {
	_id: string;
	initialPostalCode: string;
	finalPostalCode: string;
	type: string;	
}

const MethodPriceSchema = new mongoose.Schema({
	initialWeight: {
		type: Number,
		required: true
	},
	finalWeight: {
		type: Number,
		required: true
	},
	value: {
		type: Number,
		required: true
	},
}, {
	collection: 'MethodPrice',
	versionKey: false
});

const MethodPrice = mongoose.model('MethodPrice', MethodPriceSchema);
export default MethodPrice;