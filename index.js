class BoolExpr {

	constructor(options = {}) {
		this.options = Object.assign({
			operators: ['||', '&&'],
			operatorsDisplayed: {},
			complexity: 2,
			logicalValues: [true, false],
		}, options);
	}

}
