import mongoose from "../database";

export interface MethodPriceDTO {
	_id: string;
	initialWeight: number;
	finalWeight: number;
	value: number;
}

export interface MethodPriceRequest {
	initialWeight: string;
	finalWeight: string;
	value: string;
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