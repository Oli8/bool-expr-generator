# bool-expr-generator

A simple generator of boolean expressions.  

## Installation
#### NPM
```shell
npm install --save bool-expr-generator
```

## Usage

```js
import BoolExpr from 'bool-expr-generator';
const boolGenerator = new BoolExpr();
const expr = boolGenerator.generate(); // 'true && false'

// You may pass an option object to the constructor
const boolGenerator = new BoolExpr({
	complexity: 3,
	operators: ["||", "&&", "^"],
	operatorsDisplayed: {"^": "XOR", "&&": "AND", "||": "OR"},
	logicalValues: [true, false, 0, 1],
	invertedValue: true,
});
const expr = boolGenerator.generate(); // 'false XOR 1 OR true'
// If cou customised the operatorsDisplayed option you can use the convert method to convert the expression into an evaluable one
console.log(boolGenerator.convert(expr)); // 'false ^ 1 || true'
// Update options:
boolGenerator.options({complexity: 4});
console.log(boolGenerator.generate()); // true XOR 1 AND !0 OR !0

// You can also use a nested expression with or without its own options
const boolGenerator = new BoolExpr({
	logicalValues: [true, false, BoolExpr.nestedExpr({complexity: 2, logicalValues: [0, 1]})], // Note that it is advised to specify the logicalValues
});
const expr = boolGenerator.generate(); // 'false && (0 || 1)'
```

### Option object  
| Key  | Type | Default | Example | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| complexity | `integer` \| `Array<integer>` | 2  | `3` \| `[2, 4]` | Length of the expression, if an array is supplied the complexity will be a random value of it |
| operators | `Array<string>`  | `['\|\|', '&&']` | `['\|\|', '&&', '^']` | The logical operators to be used |
| operatorsDisplayed | `Object`  | `{}` | `{'^': 'XOR'}` | How the operators will be displayed in the expresssion |
| logicalValues | `Array`  | `[true, false]` | `[0, 1, true, false]` | The logical values that can be included into the expression |
| invertedValue | `boolean` \| `float`  | `false` | `true` \| `.3` | Whether to add the inverted logical values or probability to have an inverted value for each logical values |
