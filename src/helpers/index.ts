export default {
	formatPostalCode: (digit: number, n: number) => {
		var postalCode = n.toString();
		var first = postalCode.slice(0,4);
		var end = postalCode.slice(4);
		return `${digit}${first}-${end}`;
	}
}