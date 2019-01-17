class BoolExpr {

	constructor(options = {}) {
		this.options = Object.assign({
			operators: ['||', '&&'],
			operatorsDisplayed: {},
			complexity: 2,
			logicalValues: [true, false],
		}, options);
	}

	generate() {
		let expression = this.constructor._arrayRandom(this.options.logicalValues);

		for(let i=0; i<this.options.complexity - 1; i++) {
			expression += ` ${this._randomOperator()} ${this._randomLogicalValue()}`
		}

		return expression;
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
