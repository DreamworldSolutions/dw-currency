import { LitElement, html, css } from '@dreamworld/pwa-helpers/lit.js';
import { DwCurrency } from './dw-currency';
import { styleMap } from 'lit/directives/style-map.js';
export class DwCurrencyFormat extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: inline;
        }
      `
    ];
  }

  static get properties() {
    return {
      /**
       * Input Property
       * Currency value
       */
      value: { type: Number },

      /**
       * Input Property
       * ISO Currency Code
       */
      currency: { type: String },

      /**
       * Input Property
       * Number of decimal points needed.
       */
      decimalPoints: { type: Number },

      /**
       * Input property.
       * Position of the symbol. Possible values: `none`, `prefix` and `postfix`. Default: `prefix`.
       */
      symbolPosition: String,

      /**
       * Input property
       * Set to `true` to not show negative sign when value is negative.
       */
      noNegative: { type: Boolean },

      /**
       * Input property
       * Set to `true` to not show Extra Decimal Zero.
       */
      noExtraDecimalZero: { type: Boolean }
    }
  }

  constructor() {
    super();
    this.symbolPosition = 'prefix';
  }

  render() {
    if (this.value === undefined || this.value === null) {
      return;
    }

    if (this.symbolPosition === 'none') {
      return this._getValue();
    } else if (this.symbolPosition === 'prefix') {
      return html`${this._getSymbol()}&nbsp;${this._getValue()}`
    } else {
      return html`${this._getValue()}&nbsp;${this._getSymbol()}`;
    }
  }

  _getValue() {
    return html`<span class="value">${DwCurrency.format({
      value: this.value,
      currency: this.currency,
      decimalPoints: this.decimalPoints,
      noNegative: this.noNegative,
      noExtraDecimalZero: this.noExtraDecimalZero
    })}</span>`;
  }

  /**
   * Template of icon with config
   */
  _getSymbol() {
    let { symbol, symbolStyle } = DwCurrency.getCurrencyConfig(this.currency);
    return html`<span style=${styleMap(symbolStyle || {})}>${symbol}</span>`;
  }
}

window.customElements.define('dw-currency-format', DwCurrencyFormat);
