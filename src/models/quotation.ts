import mongoose from "../database";

export interface QuotationDTO {
	_id: string;
	initialWeight: number;
	finalWeight: number;
	value: number;
}

export interface QuotationRequest {
	initialZipCode: string;
    finalZipCode: string;
    packageType: 'box' | 'envelope';
    height?: number;
    width?: number;
    length?: number;
    packageValue: number;
}

const QuotationSchema = new mongoose.Schema({
	initialZipCode: {
		type: String,
		required: true
	},
    finalZipCode: {
		type: String,
		required: true
	},
    packageType: {
		type: String,
		required: true
	},
    height: {
		type: Number,
		required: false
	},
    width: {
		type: Number,
		required: false
	},
    length: {
		type: Number,
		required: false
	},
    packageValue: {
        type: Number,
        required: true,
        default: 0
    }
}, {
	collection: 'Quotation',
	versionKey: false
});

const Quotation = mongoose.model('Quotation', QuotationSchema);
export default Quotation;