class BoolExpr {

	constructor(options = {}) {
		this.options = Object.assign({
			operators: ['||', '&&'],
			operatorsDisplayed: {},
			complexity: 2,
			logicalValues: [true, false],
			invertedValue: false,
		}, options);

		if (this.options.invertedValue)
			this.generateInvertedValues();
	}

	generate() {
		let expression = this.constructor._arrayRandom(this.options.logicalValues);

		for(let i=0, complexity=this.options.complexity ; i<complexity - 1; i++) {
			expression += ` ${this._randomOperator()} ${this._randomLogicalValue()}`
		}

		return expression;
	}

	generateInvertedValues() {
		this.options.logicalValues = this.options.logicalValues.concat(
			this.options.logicalValues.map(v => "!" + v)
		);
	}

	static _arrayRandom(array) {
		return array[Math.floor(Math.random() * array.length)];
	}

	_randomOperator() {
		return this.constructor._arrayRandom(this.options.operators);
	}

	_randomLogicalValue() {
		return this.constructor._arrayRandom(this.options.logicalValues);
	}
}
