# Dw currency


## dw-currency-format

### Install

```bash
yarn add @dreamworld/dw-currency
```

or

```bash
npm install @dreamworld/dw-currency
```

### Usage

```js
import '@dreamworld/dw-currency-format';
import { DwCurrency } from '@dreamworld/dw-currency';
```

```html
<dw-currency-format value=${1500} currency=${USD}></dw-currency-format>
```
#### DwCurrency Methods
| Method | Arguments | Returns |
| ------ | --------- | ------- |
| format | value (Number) or Object (e.g. {value: Number, currency: String, decimalPoints: Number, noNegative: Boolean, noExtraDecimalZero: Boolean})| (String): Returns amount in string |
| formatWithSymbol | value (Number) or Object (e.g. {value: Number, currency: String, position: String}) | (String): Returns amount in string with currency symbol |

#### Usage
```js
DwCurrency.format(150023)
//return 1500.23
DwCurrency.formatWithSymbol(150023)
//return ₹ 1500.23
DwCurrency.formatWithSymbol({value: 150023, symbol: "EUR"})
//return € 1500.23
DwCurrency.formatWithSymbol({value: 150023, symbol: "EUR", position: "postfix"})
//return 1500.23 €
``` 

#### Properties

| Property        | Type  | Description |
| ------------- | -----| -------- |
| value | Number | Currency Value which is to be formatted. |
| currency | String | Iso code of currency |
| symbolFormat | String (enum) | Position of the symbol. Possible values: `none`, `prefix` and `postfix`. Default: `prefix`. |
| decimalPoints | Number | Number of the decimal points to be shown. Default value is used from the global configuration. But, sometimes, we may need to override it at the time of usage. e.g. Set it to `0` to show no decimal at all. |
| noNegative | Boolean | When `true` doesn't shown negative sign |
| noExtraDecimalZero | Boolean | When `true` doesn't shown extra decimal zero |

## Global Configuration
With the library we have shipped few currencies configuration, see `currency-config.js`. That should be sufficient for most of the use-case.


### Change global configuration
Sample configuration for a (single) currency is as follows:
```js
{
  symbol: "₹",
  thousandSeparator: ',',
  decimalSeparator: '.',
  thousandSpacing: '2s',
  decimalPoints: 2,
  valueDivider: 1
}
```

We can change a configuration for any existing currency, or add a new currency to the config as follows.

```js
import { DwCurrency } '@dreamworld/dw-currency';
DwCurrency.setConfig({
    USD: {
        symbol: '$',
        thousandSpacing: '3'
    },
    MYCURRENCY: {
        symbol: "MC",
        valueDivider: 100
    }
});
```

#### Currency Config
| Configuration name        | Type           | Description |
| ------------- |-------------| ----- |
| symbol | String | Currency Symbol |
| thousandSeparator | String | Character to be used as thousand separator. Default value: `,` (comma) |
| decimalSeparator | String|  Character to be used as decimal separator. Default value: `.` (dot) |
| thousandSpacing | String (enum) | How many numbers are grouped for thousand separator. Possible values are `2`, `2s`, `3`, `4`. Default value: `3`.  Whne `2` will format like 1,23,45,67,89. When `3` will format like 1,234,567,981. When `2s` will format like 1,23,45,67,981. When  `4` will format like 1,2345,6789. |
| symbolStyle | Object |   | CSS Styles to be applied to symbol. e.g `{color: 'green'}`. It turns symbol into green color. This is mostly used to set custom/required font for the symbol. |
| decimalPoints | Number | Precision. Number of digits after decimal points. Default value: `2`. |
| valueDivider | Number | 1 | Actual value of the currency = value/valueDivider. Default value: `1`. E.g. In Hisab currency value is non-floating point (integer, actually long) number. It's possible becuase, currency value is considered in Paisa/Cent. So, It's actual value is found by dividing it with `100`. In such case you need to set `valueDivider` to 100. |

#### Change Defaults
Default config for all the currencies are as follows. It's defined in `currency-config.js`.

```js
{
  thousandSeparator: ',',
  decimalSeparator: '.',
  thousandSpacing: '3',
  decimalPoints: 2,
  valueDivider: 1
}
```

And this defaults can be overriden for your application (at global level), using following:


```js
import { DwCurrency } '@dreamworld/dw-currency';
DwCurrency.setDefaults({
  thousandSeparator: ',',
  decimalSeparator: '.',
  thousandSpacing: '3',
  decimalPoints: 2,
  valueDivider: 100
});
```
#### setDefaultCurrency
```js
DwCurrency.setDefaultsCurrrency("INR");
``` 