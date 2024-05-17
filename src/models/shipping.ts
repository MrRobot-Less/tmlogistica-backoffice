import mongoose from "../database";

export interface ShippingDTO {
	_id: string;
	initialPostalCode: number;
	finalPostalCode: number;
	digit: number;
	type: string;
}

export interface ShippingFormat {
	_id: string;
	initialPostalCode: string;
	finalPostalCode: string;
	type: string;	
}

const ShippingSchema = new mongoose.Schema({
	
	type: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	deliveryTime: {
		type: Number,
		required: true
	},
	percentageInsurance: {
		type: Number,
		required: true
	},
	arrivesInSaturday: {
		type: Boolean,
		required: true
	},
	methodPrices: {
		type: [{
			initialWeight : Number,
			finalWeight : Number,
			value : Number
		}],
		default: []
	}
}, {
	collection: 'Shipping',
	versionKey: false
});

const Shipping = mongoose.model('Shipping', ShippingSchema);
export default Shipping;