# @dreamworld/dw-currency

A utility library for formatting currency values as strings, with an optional LitElement web component (`<dw-currency-format>`) for rendering formatted currency with visual decimal de-emphasis.

---

## 1. User Guide

### Installation & Setup

```bash
npm install @dreamworld/dw-currency
# or
yarn add @dreamworld/dw-currency
```

**Peer dependencies** (required at runtime):

| Package | Role |
|---|---|
| `@dreamworld/pwa-helpers` | Provides `LitElement` and `lit.js` for the web component |
| `lodash-es` | Used for deep config merging (`merge`) |

---

### Basic Usage

#### Utility class

```javascript
import { DwCurrency } from '@dreamworld/dw-currency';

// Format a value (no symbol)
DwCurrency.format(1234567.89, 'USD');
// → "1,234,567.89"

// Format with symbol (prefix by default)
DwCurrency.formatWithSymbol(1234567.89, 'USD');
// → "US$ 1,234,567.89"

// Format with symbol as postfix
DwCurrency.formatWithSymbol(5012, 'EUR', 'postfix');
// → "1,234,567.89 €"
```

#### Web component

```html
<!-- Import the element -->
<script type="module">
  import '@dreamworld/dw-currency/dw-currency-format.js';
</script>

<!-- Basic usage -->
<dw-currency-format value="1234567.89" currency="USD"></dw-currency-format>

<!-- Postfix symbol -->
<dw-currency-format value="1234567.89" currency="INR" symbolPosition="postfix"></dw-currency-format>

<!-- No symbol -->
<dw-currency-format value="1234567.89" currency="USD" symbolPosition="none"></dw-currency-format>

<!-- Custom decimal points -->
<dw-currency-format value="235257.678" currency="USD" decimalPoints="4"></dw-currency-format>

<!-- Hide negative sign -->
<dw-currency-format value="-1234" currency="USD" noNegative></dw-currency-format>

<!-- Suppress trailing decimal zeros -->
<dw-currency-format value="59.9" currency="USD" noExtraDecimalZero decimalPoints="5"></dw-currency-format>
```

---

### API Reference

#### `DwCurrency` — Static Utility Class

| Method | Signature | Return | Description |
|---|---|---|---|
| `setConfig` | `(config: Object) => void` | `void` | Merges `config` into the global currency config. Use to add new currencies or override existing ones. **Note:** Partial override is not supported — all fields for a currency must be provided. |
| `setDefaults` | `(defaultConfig: Object) => void` | `void` | Replaces the global default config applied to every currency that does not specify its own value. |
| `setDefaultCurrency` | `(currency: String) => void` | `void` | Sets the defaults to the resolved config of `currency`. Subsequent calls to `format`/`formatWithSymbol` without a `currency` argument use these defaults. |
| `getCurrencyConfig` | `(currency: String) => Object` | `Object` | Returns the merged config for `currency`: global defaults → per-currency overrides. |
| `format` | `(value, currency?, decimalPoints?, noNegative?, noExtraDecimalZero?, thousandSeparator?, thousandSpacing?) => String` | `String` | Formats `value` as a locale-style string **without** the currency symbol. Also accepts a single config `Object` as the first argument. |
| `formatWithSymbol` | `(value, currency?, position?, decimalPoints?, noNegative?, noExtraDecimalZero?, thousandSeparator?, thousandSpacing?) => String` | `String` | Same as `format`, but prepends or appends the currency symbol. Also accepts a single config `Object` as the first argument. |

**`format` / `formatWithSymbol` — Object argument form:**

```javascript
DwCurrency.format({
  value: 25454,
  currency: 'USD',
  decimalPoints: 2,
  noNegative: false,
  noExtraDecimalZero: false,
  thousandSeparator: ',',
  thousandSpacing: '3'
});

DwCurrency.formatWithSymbol({
  value: 25454,
  currency: 'USD',
  position: 'postfix',     // 'prefix' | 'postfix'
  decimalPoints: 2,
  noNegative: false,
  noExtraDecimalZero: false,
  thousandSeparator: ',',
  thousandSpacing: '3'
});
```

---

#### `<dw-currency-format>` — LitElement Web Component

| Property | Attribute | Type | Default | Required | Description |
|---|---|---|---|---|---|
| `value` | `value` | `Number` | — | Yes | The numeric currency amount to display. Renders nothing if `undefined` or `null`. |
| `currency` | `currency` | `String` | — | No | ISO 4217 currency code (e.g. `"USD"`, `"INR"`). Falls back to global defaults if omitted. |
| `decimalPoints` | `decimal-points` | `Number` | From config | No | Number of decimal places to render. Overrides the per-currency config value. |
| `symbolPosition` | `symbol-position` | `String` | `"prefix"` | No | Position of the currency symbol. Accepted values: `"prefix"`, `"postfix"`, `"none"`. |
| `noNegative` | `no-negative` | `Boolean` | `false` | No | When `true`, suppresses the minus sign on negative values. |
| `noExtraDecimalZero` | `no-extra-decimal-zero` | `Boolean` | `false` | No | When `true`, omits trailing zeros in the decimal part. |

**Events:** None defined in source.

**Slots:** None defined in source.

---

#### CSS Custom Properties / Shadow Parts

The component does not expose CSS custom properties. Internal styling applied to shadow DOM:

| Selector | Style | Effect |
|---|---|---|
| `:host` | `display: inline` | Renders inline in document flow |
| `.decimal` | `opacity: 0.7; font-size: 75%` | Visually de-emphasizes the decimal portion |

> The integer part renders inside `.integer` span; the decimal portion renders inside `.decimal` span.

---

### Configuration Options

#### Global Defaults (`currency-config.js` → `defaults`)

Applied to every currency that does not specify its own override:

| Property | Type | Default | Description |
|---|---|---|---|
| `thousandSeparator` | `String` | `","` | Character inserted between thousand groups |
| `decimalSeparator` | `String` | `"."` | Character separating integer from decimal |
| `thousandSpacing` | `String` | `"3"` | Digit grouping mode (see table below) |
| `decimalPoints` | `Number` | `2` | Number of decimal places |
| `valueDivider` | `Number` | `1` | Divides the raw value before formatting (e.g. `100` converts paise to rupees) |

#### `thousandSpacing` Values

| Value | Grouping Pattern | Example |
|---|---|---|
| `"3"` (default) | Groups of 3 | `1,234,567` |
| `"2"` | Groups of 2 | `12,34,567` |
| `"2s"` | Last group of 3, rest groups of 2 | `1,23,45,678` (South Asian style) |
| `"4"` | Groups of 4 | `123,4567` |

#### Per-Currency Config Fields

| Field | Type | Description |
|---|---|---|
| `displayName` | `String` | Human-readable name (e.g. `"USD - United States dollar"`) |
| `symbol` | `String` | Currency symbol (e.g. `"$"`, `"₹"`, `"€"`) |
| `symbolStyle` | `Object` | Inline style object applied to the symbol `<span>` in `<dw-currency-format>` |
| `thousandSpacing` | `String` | Per-currency override of grouping mode (e.g. `INR` uses `"2s"`) |
| `thousandSeparator` | `String` | Per-currency override |
| `decimalSeparator` | `String` | Per-currency override |
| `decimalPoints` | `Number` | Per-currency override |
| `valueDivider` | `Number` | Per-currency override |

---

### Advanced Usage

#### Adding a custom currency

```javascript
import { DwCurrency } from '@dreamworld/dw-currency';

DwCurrency.setConfig({
  MYC: {
    symbol: 'MC',
    decimalPoints: 2,
    thousandSeparator: ',',
    decimalSeparator: '.',
    thousandSpacing: '3',
    valueDivider: 1
  }
});

DwCurrency.format(11040006, 'MYC'); // → "11,040,006.00"
```

> **Warning:** Partial config is not merged — any field not provided will be `undefined`. Provide all required fields when calling `setConfig` for a currency.

#### Setting a default currency and global `valueDivider`

```javascript
// Values are stored in paise (1/100 of a rupee); divide by 100 automatically
DwCurrency.setDefaults({
  thousandSeparator: ',',
  decimalSeparator: '.',
  thousandSpacing: '3',
  decimalPoints: 2,
  valueDivider: 100
});

DwCurrency.setDefaultCurrency('INR');

// Now calls without explicit currency use INR config with valueDivider=100
DwCurrency.formatWithSymbol({ value: 25454, position: 'postfix' });
// → "254.54 ₹"
```

---

## 2. Developer Guide / Architecture

### Architecture Overview

The library is split into two independent layers:

1. **`DwCurrency` (static class)** — pure formatting logic with no DOM dependency. All methods are static; the class is never instantiated. Config is stored on static class properties (`_config`, `_defaultConfig`).
2. **`DwCurrencyFormat` (LitElement)** — a thin rendering wrapper that delegates all formatting to `DwCurrency.format()` and composes the HTML template. The component itself holds no formatting state beyond its declared properties.

Design pattern: **Static Service / Singleton** for the utility; **Presentational Component** for the element.

---