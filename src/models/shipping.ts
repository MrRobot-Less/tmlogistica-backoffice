import mongoose from "../database";

export interface ShippingDTO {
	_id: string;
	type: string;
	name: string;
	deliveryTime: number;
	percentageInsurance: number;
	arrivesInSaturday: boolean;
};

export interface ShippingRequest {
	type: string;
	name: string;
	deliveryTime: string;
	percentageInsurance: string;
	arrivesInSaturday: 'yes' | 'no';
};

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
		type: [mongoose.Schema.Types.ObjectId],
		default: []
	}
}, {
	collection: 'Shipping',
	versionKey: false
});

const Shipping = mongoose.model('Shipping', ShippingSchema);
export default Shipping;