export interface IPayloadCalculate {
	'cep-origin': string;
	'cep-target': string;
	'do-not-want-insurance'?: 'on';
	height: string;
	length: string;
	packeage: string;
	value: string;
	weight: string;
	width: string;

}

export interface ShippingResponse {
	deliverySaturday: boolean,
	shippingCompany: string
	name: string,
	value: number
	deadlineDelivery: string,
	homeDelivery: boolean
}

export const fallbackShippingResponse: ShippingResponse[] = [
	{
	  deliverySaturday: false,
	  shippingCompany: "TM",
	  name: "SameDay",
	  value: 0,
	  deadlineDelivery: "Não disponivel",
	  homeDelivery: false,
	},
	{
	  deliverySaturday: false,
	  shippingCompany: "TM",
	  name: "NextDay",
	  value: 0,
	  deadlineDelivery: "Não disponivel",
	  homeDelivery: false,
	},
  ];