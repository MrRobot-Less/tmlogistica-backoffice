import { ObjectId } from "mongoose";
import { IPayloadCalculate, ShippingResponse, fallbackShippingResponse } from "../../dtos/api";
import { AppError } from "../../dtos/error";
import helpers from "../../helpers";
import Coverage, { CoverageDTO } from "../../models/coverage";
import MethodPrice, { MethodPriceDTO } from "../../models/method-price";
import Shipping, { ShippingDTO } from "../../models/shipping";

export const APIService = {
	calculate: {
		TMShipping: {
			getCoverage: (postalCode: string) => new Promise<CoverageDTO | null>(resolve => {
				const zipcode = helpers.reversePostalCode(postalCode);
				Coverage.findOne({
					digit: zipcode.digit,
					initialPostalCode: { $lte: zipcode.code },
					finalPostalCode: { $gte: zipcode.code }
				})
					.then(coverage => resolve(coverage?.toJSON() || null))
					.catch(error => resolve(null));
			}),
			getAllPriceWeightId: (w: string) => new Promise<any[] | []>(resolve => {
				const weight = parseFloat(w);
				MethodPrice.find({
					initialWeight: { $lte: weight },
					finalWeight: { $gte: weight }
				})
					.then(prices => resolve(prices.map(price => price.toJSON()._id)))
					.catch(() => resolve([]));

			}),
			getPriceWeight: (pricesId: any[], w: string) => new Promise<MethodPriceDTO | null>(resolve => {
				const weight = parseFloat(w);
				MethodPrice.findOne({
					_id: { $in: pricesId },
					initialWeight: { $lte: weight },
					finalWeight: { $gte: weight }
				})
					.then(price => resolve(price?.toJSON() || null))
					.catch(error => resolve(null));
			}),
			getShipping: (pricesId: any[], type: string) => new Promise<ShippingDTO[]>(resolve => {
				Shipping.find({
					methodPrices: { $in: pricesId },
					type: type
				}).sort({ _id: -1 })
					.then(shippings => resolve(shippings.map(shipping => shipping.toJSON())))
					.catch(() => resolve([]));
			}),
			getValue: async (productValue: string, pricesId: any[], weight: string, percentageInsurance: number) => {
				const price = await APIService.calculate.TMShipping.getPriceWeight(pricesId, weight);
				if (!price) { throw new Error('price weight not found'); }
				return price.value + (parseFloat(productValue ?? 0) / 100) * percentageInsurance;
			},
			formatDeadlineDelivery: (deliveryTime: number) => {
				if (deliveryTime === 0) { return 'Entrega no mesmo dia'; }
				else if (deliveryTime > 1) {
					var intPart = parseInt(deliveryTime.toString());
					var rest = deliveryTime - intPart;
					return `${intPart} ${rest ? helpers.decimalToFraction(rest) : ''} ${intPart > 1 ? 'Dias úteis' : 'Dia útil'}`;
				}
				return `${helpers.decimalToFraction(deliveryTime)} Dia útil`;
			},
			calc: (data: IPayloadCalculate, cb: (error: AppError | null, shippings: ShippingResponse[]) => void) => {
				Promise.all([
					APIService.calculate.TMShipping.getCoverage(data["cep-origin"]),
					APIService.calculate.TMShipping.getCoverage(data["cep-target"])
				]).then(async coverages => {
					
					var areThereCoverage = coverages.every(coverage => !!coverage);
					if (!areThereCoverage) { return cb(new AppError('No coverage for this postal code.'), fallbackShippingResponse); }
					coverages.sort((a, b) => b!.finalPostalCode - a!.finalPostalCode);
					const type = coverages[0]!.type;
					const pricesId = await APIService.calculate.TMShipping.getAllPriceWeightId(data.weight);
					APIService.calculate.TMShipping.getShipping(pricesId, type)
						.then(async shippings => {
							if (!shippings?.length) { return cb(null, fallbackShippingResponse); }
							Promise.all(shippings.map(async shipping => ({
								name: shipping.name,
								deadlineDelivery: APIService.calculate.TMShipping.formatDeadlineDelivery(shipping.deliveryTime),
								deliverySaturday: shipping.arrivesInSaturday,
								homeDelivery: true,
								shippingCompany: 'TM',
								value: (await APIService
												.calculate
												.TMShipping
												.getValue(
													data["do-not-want-insurance"] === 'on' ? '0' : data.value,
													shipping.methodPrices,
													data.weight, shipping.percentageInsurance)),
							} as ShippingResponse))).then(response => {
								cb(null, response);
							}).catch(error => cb(error, fallbackShippingResponse));
						})
						.catch(error => cb(error, fallbackShippingResponse));	
				}).catch(error => cb(error, fallbackShippingResponse));
			}
		}
	}
}