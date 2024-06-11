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

        .decimal {
          opacity: 0.7;
          font-size: var(--decimal-font-size, inherit);
        }
      `,
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
    this.symbolPosition = "prefix";
  }

  connectedCallback() {
    super.connectedCallback();
    this._setDecimalFontSize();
  }

  render() {
    if (this.value === undefined || this.value === null) {
      return;
    }

    return html`${this._getValue()}`;
  }

  _getValue() {
    const formattedValue = DwCurrency.format({
      value: this.value,
      currency: this.currency,
      decimalPoints: this.decimalPoints,
      noNegative: this.noNegative,
      noExtraDecimalZero: this.noExtraDecimalZero,
    });

    const [integerPart, decimalPart] = formattedValue.split(".");

    const integerTemplate = html`<span class="integer"
      >${integerPart}${decimalPart ? "." : ""}</span
    >`;
    const decimalTemplate = html`${
      decimalPart ? html`<span class="decimal">${decimalPart}</span>` : ""
    }</span>`;

    if (this.symbolPosition === "none") {
      return html`${integerTemplate}${decimalTemplate}`;
    } else if (this.symbolPosition === "prefix") {
      return html`${this._getSymbol()}&nbsp;${integerTemplate}${decimalTemplate}`;
    } else {
      return html`${integerTemplate}${decimalTemplate}&nbsp;${this._getSymbol()}`;
    }
  }

  /**
   * Template of icon with config
   */
  _getSymbol() {
    let { symbol, symbolStyle } = DwCurrency.getCurrencyConfig(this.currency);
    return html`<span style=${styleMap(symbolStyle || {})}>${symbol}</span>`;
  }

  _setDecimalFontSize() {
    let fontSize = getComputedStyle(this).getPropertyValue("font-size");
    fontSize = parseFloat(fontSize);
    const decimalFontSize = fontSize * 0.75;
    this.style.setProperty("--decimal-font-size", `${decimalFontSize}px`);
  }
}

window.customElements.define('dw-currency-format', DwCurrencyFormat);
