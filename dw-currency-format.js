import { css, LitElement, html } from 'lit-element';
import { DwCurrency } from './dw-currency';
import { styleMap } from 'lit-html/directives/style-map';
export class DwCurrencyFormat extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        .dw-currency {
          display: inline-flex;
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
       * `true` to hide decimal points
       */
      noDecimals: { type: Boolean },

      /**
       * Input property
       * `true` to hide currency symbol
       */
      noSymbol: { type: Boolean },

      /**
       * Input property
       * True to hide minus sign
       */
      hideNegativeSign: { type: Boolean },

      /**
       * Input property
       * `true` if dw-currency-format is active
       */
      active: { type: Boolean }
    }
  }
  render() {
    let { format } = DwCurrency.getConfig(this.currency);
    if (format && format === "%v %s") {
      return html`<div class="dw-currency">${DwCurrency.formatCurrency({
        value: this.value,
        currency: this.currency,
        noDecimals: this.noDecimals,
        noSymbol: this.noSymbol,
        hideNegativeSign: this.hideNegativeSign
      })} ${!this.noSymbol ? html`&nbsp;${this._getCurrencyIcon()}` : null} </div>`;
    }
    return html`<div class="dw-currency">${!this.noSymbol ? html`${this._getCurrencyIcon()}&nbsp;` : null}${DwCurrency.formatCurrency({
      value: this.value,
      currency: this.currency,
      noDecimals: this.noDecimals,
      noSymbol: this.noSymbol,
      hideNegativeSign: this.hideNegativeSign
    })}</div>`
  }

  /**
   * Template of icon with config
   */
  _getCurrencyIcon() {
    let { symbolText, symbolStyle } = DwCurrency.getConfig(this.currency);
    return html`<div style=${styleMap(symbolStyle)}>${symbolText ? symbolText : DwCurrency.getSymbol(this.currency)}</div> `;
  }
}

window.customElements.define('dw-currency-format', DwCurrencyFormat);