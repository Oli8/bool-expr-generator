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

		generate({options=this._options, nested=false}={}) {
			if (nested)
				options = {...this._options, ...options};

			let complexity = options.complexity;
			if (Array.isArray(complexity))
				complexity = this.constructor._arrayRandom(complexity);

			const getLogicalValue = this._randomLogicalValue.bind(this, options);
			let expression = getLogicalValue();
			for (let i=0; i<complexity-1; i++) {
				expression += ` ${this._randomOperator(options)} ${getLogicalValue()}`
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

		_randomOperator(options) {
			const operator = this.constructor._arrayRandom(options.operators);
			return options.operatorsDisplayed[operator] || operator;
		}

		_randomLogicalValue(options) {
			const logicalValue = this.constructor._arrayRandom(options.logicalValues);
			if (Array.isArray(logicalValue) && logicalValue[0] === 'NESTED_EXPR') {
				return this.generate({options: logicalValue[1], nested: true});
			}

			return logicalValue;
		}

		_removeArraysfromArray(array) {
			return array.filter(v => !Array.isArray(v));
		}

		static nestedExpr(options={}) {
			return ['NESTED_EXPR', options];
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
