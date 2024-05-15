import { ObjectId } from "mongoose";
import mongoose from "../database";

export interface CoverageDTO {
	_id: string;
	initialPostalCode: number;
	finalPostalCode: number;
	digit: number;
	type: string;
}

export interface CoverageFormat {
	_id: string;
	initialPostalCode: string;
	finalPostalCode: string;
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