import mongoose from "../database";

export interface CoverageDTO {
	_id: string;
	initialPostalCode: number;
	finalPostalCode: number;
	type: string;
}

const CoverageSchema = new mongoose.Schema({
	initialPostalCode: {
		type: Number,
		required: true,
	},
	finalPostalCode: {
		type: Number,
		required: true,
	},
	digit: {
		type: Number,
		required: true
	},
	type: {
		type: String,
		required: true
	}
}, {
	collection: 'Coverage',
	versionKey: false
});

const Coverage = mongoose.model('Coverage', CoverageSchema);
export default Coverage;