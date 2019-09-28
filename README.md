# Dw currency


- Dw currency provides utility functions for format currency
  - e.g `setConfig` `formatCurrency` `getSymbol`
- Common utility function used by `dw-currency-format` and `dw-currency-input`
- using `setConfig` custom config will be applied



### Install
Through yarn
`yarn add @dreamworld/dw-currency`

Through npm
`npm install react-currency-format`

### import

```js
import '@dreamworld/dw-currency';
```

### Currency Config
| Props        | Options           | Default  | Description |
| ------------- |-------------| -----| -------- |
| thousandSeparator | mixed: single character string or boolean true (true is default to ,) |','| Add thousand separators on number |
| thousandSpacing | String, One of ['2', '2s', '3', '4'] | '2s' | Add thousand group spacing on number. Default: '2' will format like 1,23,45,67,89 __ '3' will format like 1,234,567,981 __ '2s' will format like 1,23,45,67,981 __ '4' will format like 1,2345,6789 |
| decimalSeparator | single character string| . | Support decimal point on a number |
| symbolText | String |   | Given text shown instead of currency symbol
| symbolStyle | Object |   | styles symbol with given styles e.g {color: 'green'} its turn symbol into green color
| symbol | String |   | Symbol is shown before amount
| decimalPoints | Number | none| If defined it limits to given decimal scale |
| hideNegativeSign      | boolean     |   false | hides minus sign of nagative amount |
| format | %v %s | %s %v  | %s stands for symbol and %v stand for value
| valueDivider | Number | 1 | Divide's actual amount by given value

#### Syntax:
```js
DwCurrency.setConfig({
    $currency: $currencyConfig
});
```

#### Example:
```js
import { DwCurrency } from './dw-currency';

// Need to specify the only currencies which needs to be overridden. So, currency not provided here will be working with it’s default value.

DwCurrency.setConfig({
    "INR": {
       "valueDivider": 100,
       "symbol": "₹"
    },
    "USD": {
       "valueDivider": 50,
       "symbolText": 'USD'
       "format": "%v %s"
       "symbolStyle": {color: 'green', fontSize: '18px'}
    },
});

//
DwCurrency.formatCurrency({
    value: this.value,
    currency: this.currency,
    noDecimals: this.noDecimals,
    noSymbol: this.noSymbol,
    allowNegative: this.allowNegative
})

```
#### Usage
- Set currencyConfig once, ideally from app-shell:
- Use dw-currency-format whenever needed.


# Dw currency format
- Provides formated view of currency


#### Properties

| Props        | Type  | Description |
| ------------- | -----| -------- |
| value | Number | Amount  which is shown in view
| currency | String | Iso code of currency
| noSymbol | Boolean | True to hide currency symbol
| noDecimals | Boolean | True to hide all decimal points of given value
| hideNegativeSign | Boolean | True to hide minus sign of given value (If value is negative)

#### Usage pattern
```html
<dw-currency-format value=${1500} currency=${USD}></dw-currency-format>
```