import { AppError } from "../../dtos/error";
import Coverage, { CoverageDTO, CoverageFormat } from "../../models/coverage";
import translations from '../../translations';
import helpers from "../../helpers";
import Shipping, { ShippingDTO, ShippingRequest } from "../../models/shipping";

export const CalcService = {
	coverage: {
		create: function(data: CoverageFormat, cb: (error: AppError | null, coverageFormated: CoverageDTO | null) => void) {
			const initialPostalCode = parseInt(data.initialPostalCode.replace('-', ''));
			const finalPostalCode = parseInt(data.finalPostalCode.replace('-', ''));
			const coverage : Omit<CoverageDTO, '_id'> = {
				digit: parseInt(data.initialPostalCode[0]),
				initialPostalCode,
				finalPostalCode,
				type: data.type
			}
			Coverage.create(coverage)
				.then(coverage => {
					cb(null, coverage?.toJSON() || null);
				}).catch(error => cb(error, null));
		},
		update: function(id: string, data: CoverageFormat, cb: (error: AppError | null, coverageFormated: CoverageDTO | null) => void) {
			const initialPostalCode = parseInt(data.initialPostalCode.replace('-', ''));
			const finalPostalCode = parseInt(data.finalPostalCode.replace('-', ''));
			const coverage : Omit<CoverageDTO, '_id'> = {
				digit: parseInt(data.initialPostalCode[0]),
				initialPostalCode,
				finalPostalCode,
				type: data.type
			}
			Coverage.findOneAndUpdate({ _id: id }, coverage)
				.then(coverage => {
					cb(null, coverage?.toJSON() || null);
				}).catch(error => cb(error, null));
		},
		getAll: function(cb: (error: AppError | null, coverages: CoverageDTO[]) => void) {
			Coverage.find({})
				.then(coverages => {
					cb(null, coverages.map(coverage => coverage.toJSON()))
				}).catch(error => cb(error as AppError, []));
		},
		getById: function(id: string, cb: (error: AppError | null, coverageFormated: CoverageDTO | null) => void) {
			Coverage.findById(id)
				.then(coverage => {
					if (!coverage) return cb(null, null);
					cb(null, coverage.toJSON());
				}).catch(error => cb(error, null))
		},
		deleteById: function(id: string, cb: (error: AppError | null) => void) {
			Coverage.deleteOne({ _id: id })
				.then(() => {
					cb(null);
				}).catch(cb)
		},
		format: function(coverages: CoverageDTO[] | CoverageDTO, cb: (error: AppError | null, coveragesFormated: CoverageFormat[] | CoverageFormat) => void) {
			if (Array.isArray(coverages)) {
				var coveragesFormated : CoverageFormat[] = coverages.map(coverage => ({
					_id: coverage._id,
					initialPostalCode: helpers.formatPostalCode(coverage.digit, coverage.initialPostalCode),
					finalPostalCode: helpers.formatPostalCode(coverage.digit, coverage.finalPostalCode),
					type: coverage.type
				}));

				return cb(null, coveragesFormated);
			}
			cb(null, {
				_id: coverages._id,
				initialPostalCode: helpers.formatPostalCode(coverages.digit, coverages.initialPostalCode),
				finalPostalCode: helpers.formatPostalCode(coverages.digit, coverages.finalPostalCode),
				type: coverages.type
			});
		}
	},
	shipping: {
		getAll: function(cb: (error: AppError | null, coverages: ShippingDTO[]) => void) {
			Shipping.find({})
				.then(shippings => cb(null, shippings.map(shipping => shipping.toJSON())))
				.catch(error => cb(error as AppError, []));
		},
		getById: function(id: string, cb: (error: AppError | null, shipping: ShippingDTO | null) => void) {
			Shipping.findById(id)
				.then(shipping => cb(null, shipping?.toJSON() || null))
				.catch(error => cb(error, null))
		},
		update: function(id: string, data: ShippingRequest, cb: (error: AppError | null, shipping: CoverageDTO | null) => void) {
			const shipping : Omit<ShippingDTO, '_id'> = {
				arrivesInSaturday: data.arrivesInSaturday === 'yes',
				deliveryTime: parseFloat(data.deliveryTime),
				name: data.name,
				percentageInsurance: parseFloat(data.percentageInsurance),
				type: data.type
			}
			Shipping.findOneAndUpdate({ _id: id }, shipping)
				.then(shipping => {
					cb(null, shipping?.toJSON() || null);
				}).catch(error => cb(error, null));
		},
		create: function(data: ShippingRequest, cb: (error: AppError | null, coverageFormated: ShippingDTO | null) => void) {
			const shipping : Omit<ShippingDTO, '_id'> = {
				arrivesInSaturday: data.arrivesInSaturday === 'yes',
				deliveryTime: parseFloat(data.deliveryTime),
				name: data.name,
				percentageInsurance: parseFloat(data.percentageInsurance),
				type: data.type
			}
			Shipping.create(shipping)
				.then(shipping => cb(null, shipping?.toJSON() || null))
				.catch(error => cb(error, null));
		},
		deleteById: function(id: string, cb: (error: AppError | null) => void) {
			Shipping.deleteOne({ _id: id })
				.then(() => {
					cb(null);
				}).catch(cb)
		},
	}
};