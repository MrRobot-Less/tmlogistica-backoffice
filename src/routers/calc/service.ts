import { AppError } from "../../dtos/error";
import Coverage, { CoverageDTO, CoverageFormat } from "../../models/coverage";
import translations from '../../translations';
import helpers from "../../helpers";

export const CalcService = {
	shipping: {
		getAll: function(cb: (error: AppError | null, coverages: CoverageDTO[]) => void) {
			Coverage.find({})
				.then(coverages => {
					cb(null, coverages.map(coverage => coverage.toJSON()))
				}).catch(error => cb(error as AppError, []));
		},
		format: function(coverages: CoverageDTO[], cb: (error: AppError | null, coveragesFormated: CoverageFormat[]) => void) {
			var coveragesFormated : CoverageFormat[] = coverages.map(coverage => ({
				_id: coverage._id,
				initialPostalCode: helpers.formatPostalCode(coverage.digit, coverage.initialPostalCode),
				finalPostalCode: helpers.formatPostalCode(coverage.digit, coverage.finalPostalCode),
				type: coverage.type
			}));

			cb(null, coveragesFormated);
		}
	}
};