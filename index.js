(function() {
	class BoolExpr {

		constructor(options={}) {
			this._options = Object.assign({
				operators: ['||', '&&'],
				operatorsDisplayed: {},
				complexity: 2,
				logicalValues: [true, false],
				invertedValue: false,
			}, options);

			if (this._options.invertedValue)
				this._generateInvertedValues();
		}

		generate({complexity=this._options.complexity, nested=false}={}) {
			if (Array.isArray(complexity))
				complexity = this.constructor._arrayRandom(complexity);

			let expression = this._randomLogicalValue({onlyPrimitive: nested});
			for (let i=0; i<complexity-1; i++) {
				expression += ` ${this._randomOperator()} ${this._randomLogicalValue({onlyPrimitive: nested})}`
			}

			return nested ? `(${expression})` : expression;
		}

		options(options) {
			 Object.assign(this._options, options);
		}

		_generateInvertedValues() {
			this._options.logicalValues = this._options.logicalValues.concat(
				this._removeArraysfromArray(this._options.logicalValues)
					.map(v => '!' + v)
			);
		}

		static _arrayRandom(array) {
			return array[Math.floor(Math.random() * array.length)];
		}

		_randomOperator() {
			const operator = this.constructor._arrayRandom(this._options.operators);
			return this._options.operatorsDisplayed[operator] || operator;
		}

		_randomLogicalValue({onlyPrimitive=false}={}) {
			const logicalValues = onlyPrimitive ?
				this._removeArraysfromArray(this._options.logicalValues) :
				this._options.logicalValues;
			const logicalValue = this.constructor._arrayRandom(logicalValues);
			if (Array.isArray(logicalValue) && logicalValue[0] === 'NESTED_EXPR') {
				return this.generate({complexity: logicalValue[1], nested: true});
			}

			return logicalValue;
		}

		_removeArraysfromArray(array) {
			return array.filter(v => !Array.isArray(v));
		}

		static nestedExpr(complexity) {
			return ['NESTED_EXPR', complexity];
		}

		convert(expression) {
			const operatorsDisplayed = this._options.operatorsDisplayed;
			// Return original expression if operatorsDisplayed is empty
			if (Object.keys(operatorsDisplayed).length === 0)
				return expression;
			const searchRegex = new RegExp(Object.values(operatorsDisplayed).join('|'), 'g');

			return expression.replace(
				searchRegex,
				op => {
					return Object.keys(operatorsDisplayed).find(key => {
						return operatorsDisplayed[key] === op;
					})
				}
			);
		}
	}

	if (typeof module !== 'undefined' && module.exports) {
		BoolExpr.default = BoolExpr;
		module.exports = BoolExpr;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		define('BoolExpr', [], function () {
			return BoolExpr;
		});
	} else {
		window.BoolExpr = BoolExpr;
	}
}());
