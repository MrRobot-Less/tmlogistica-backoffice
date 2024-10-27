import mongoose from "../database";

export interface ZoneDTO {
	_id: string;
	initialWeight: number;
	finalWeight: number;
	value: number;
}

export interface ZoneRequest {
	name: string;
}

const ZoneSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
}, {
	collection: 'Zone',
	versionKey: false
});

const Zone = mongoose.model('Zone', ZoneSchema);
export default Zone;