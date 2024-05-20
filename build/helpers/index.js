"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    formatPostalCode: (digit, n) => {
        var postalCode = n.toString();
        var first = postalCode.slice(0, 4);
        var end = postalCode.slice(4);
        return `${digit}${first}-${end}`;
    },
    reversePostalCode: (postalCode) => {
        var digit = parseInt(postalCode[0]);
        var zipcode = postalCode.slice(1).replace('-', '');
        return {
            digit,
            code: parseInt(zipcode)
        };
    },
    gcd: function (n1, n2) {
        if (n2 < 0.0001)
            return n1; // Since there is a limited precision we need to limit the value.
        return this.gcd(n2, Math.floor(n1 % n2)); // Discard any fractions due to limitations in precision.
    },
    decimalToFraction: function (fraction) {
        var len = fraction.toString().length - 2;
        var denominator = Math.pow(2, len);
        var numerator = fraction * denominator;
        var divisor = this.gcd(numerator, denominator);
        numerator /= divisor;
        denominator /= divisor;
        return `${numerator}/${denominator}`;
    }
};
