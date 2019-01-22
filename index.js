class BoolExpr {

	constructor(options={}) {
		this.options = Object.assign({
			operators: ['||', '&&'],
			operatorsDisplayed: {},
			complexity: 2,
			logicalValues: [true, false],
			invertedValue: false,
		}, options);

		if (this.options.invertedValue)
			this._generateInvertedValues();
	}

	generate() {
		let expression = this.constructor._arrayRandom(this.options.logicalValues);

		for (let i=0, complexity=this.options.complexity ; i<complexity - 1; i++) {
			expression += ` ${this._randomOperator()} ${this._randomLogicalValue()}`
		}

		return expression;
	}

	_generateInvertedValues() {
		this.options.logicalValues = this.options.logicalValues.concat(
			this.options.logicalValues.map(v => '!' + v)
		);
	}

	static _arrayRandom(array) {
		return array[Math.floor(Math.random() * array.length)];
	}

	_randomOperator() {
		const operator = this.constructor._arrayRandom(this.options.operators);
		return this.options.operatorsDisplayed[operator] || operator;
	}

	_randomLogicalValue() {
		return this.constructor._arrayRandom(this.options.logicalValues);
	}

	convert(expression) {
		const operatorsDisplayed = this.options.operatorsDisplayed;
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
