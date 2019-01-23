# bool-expr-generator

A simple generator of boolean expressions.  

## Usage

```js
const boolGenerator = new BoolExpr();
let expr = boolGenerator.generate(); // e.g.: 'true && false'

// You may pass an option object to the constructor
const boolGenerator = new BoolExpr({
	complexity: 3,
	operators: ["||", "&&", "^"],
	operatorsDisplayed: {"^": "XOR", "&&": "AND", "||": "OR"},
	logicalValues: [true, false, 0, 1],
	invertedValue: true,
});
```

### Option object  
| Key  | Type | Default | Example | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| complexity | `integer` \| `Array<integer>` | 2  | `3` \| `[2, 4]` | Length of the expression, if an array is supplied the complexity will be a random value of it |
| operators | `Array<string>`  | `['\|\|', '&&']` | `['\|\|', '&&', '^']` | The logical operators to be used |
| operatorsDisplayed | `Object`  | `{}` | `{'^': 'XOR'}` | How the operators will be displayed in the expresssion |
| logicalValues | `Array`  | `[true, false]` | `[0, 1, true, false]` | The logical values that can be included into the expression |
| invertedValue | `boolean`  | `false` | `true` | Whether to add the inverted logical values |