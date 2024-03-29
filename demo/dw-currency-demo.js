
import { LitElement, html, css } from '@dreamworld/pwa-helpers/lit.js';
import { DwCurrency } from '../dw-currency';
import "../dw-currency-format";

window.DwCurrency = DwCurrency;

DwCurrency.setConfig({
  MYC: {
    symbol: "MC"
  }
})

DwCurrency.setDefaults({
  thousandSeparator: ',',
  decimalSeparator: '.',
  thousandSpacing: '3',
  decimalPoints: 2,
  valueDivider: 100
});

export class DwCurrencyDemo extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
      `
    ];
  }
  
  static get properties() {
    return {
      _currency: String
    }
  }

  constructor(){
    super();
    this._currency = "INR";
  }

  render() {
    DwCurrency.setDefaultCurrency(this._currency);
    return html`<div>

      <h1>Default</h1>
      <div>Currency symbol is shown as prefix, and Decimal points are shown as per the global config for the currency.</div>
      <br>
      <br>
      <div>${DwCurrency.formatWithSymbol({value: 25454, position: 'postfix'})}</div>
      <div>${DwCurrency.formatWithSymbol(5012, "USD")}</div>
      <div>${DwCurrency.formatWithSymbol(5012, "EUR", "postfix")}</div>
      <dw-currency-format value="-110032" currency="USD"></dw-currency-format><br>
      <dw-currency-format value="112869866" currency="INR"></dw-currency-format><br>
      <dw-currency-format value="11040" currency="GBP"></dw-currency-format><br>
      <dw-currency-format value="-110032" currency="EGP"></dw-currency-format><br>
      <dw-currency-format value="11040" currency="HUF"></dw-currency-format><br>
      <dw-currency-format value="110032" currency="KGS"></dw-currency-format><br>
      <dw-currency-format value="112869866.8888" currency="LAK"></dw-currency-format><br>
      <dw-currency-format value="-11040" currency="MNT"></dw-currency-format><br>
      <dw-currency-format value="110032" currency="NPR"></dw-currency-format><br>
      <dw-currency-format value="-112869866" currency="SAR"></dw-currency-format><br>
      <dw-currency-format value="11040" currency="TJS"></dw-currency-format><br>

      <h1>Symbol as Postfix</h1>
      <dw-currency-format value="-110032" currency="USD" symbolPosition="postfix"></dw-currency-format><br>
      <dw-currency-format value="-110032" currency="INR" symbolPosition="postfix"></dw-currency-format><br>


      <h1> Without currency symbol</h1>
      <dw-currency-format value="-110032" currency="USD" symbolPosition="none"></dw-currency-format> (for USD)<br>
      <dw-currency-format value="-110032" currency="INR" symbolPosition="none"></dw-currency-format> (for INR)<br>
      <dw-currency-format value="0" currency="INR" symbolPosition="none"></dw-currency-format> (for INR)<br>


      <h1>Decimal Points customization</h1>
      <dw-currency-format value="235257.678" currency="USD" decimalPoints="0"></dw-currency-format> (No Decimal Points)<br>
      <dw-currency-format value="235257.678" currency="USD" decimalPoints="1"></dw-currency-format> (Single Decimal Point)<br>
      <dw-currency-format value="235257.678" currency="USD" decimalPoints="4"></dw-currency-format> (4 Decimal Points)<br>
      <br>
      <dw-currency-format value="235257.678" currency="INR" decimalPoints="0"></dw-currency-format>  (No Decimal Points)<br>
      <dw-currency-format value="235257.678" currency="INR" decimalPoints="1"></dw-currency-format> (Single Decimal Point)<br>
      <dw-currency-format value="235257.678" currency="INR" decimalPoints="4"></dw-currency-format> (4 Decimal Points)<br>


      <h1>No Negative Sign</h1>
      <dw-currency-format value="-110032" currency="USD" noNegative></dw-currency-format> (for USD)<br>
      <dw-currency-format value="-110032" currency="INR" noNegative="none"></dw-currency-format> (for INR)<br>

      <h1>No Extra Decimal Zero</h1>
      <dw-currency-format value=${59900 / 1000} currency="USD" noExtraDecimalZero  decimalPoints="5"></dw-currency-format> (for USD)<br>
      <dw-currency-format value=${128000 / 100}  currency="INR" noExtraDecimalZero  decimalPoints="4"></dw-currency-format> (for INR)<br>

      <h1>Custom Currency</h1>
      <dw-currency-format value="11040006" currency="MYC" decimalPoints="2"></dw-currency-format><br>

      <h1>Zero Value</h1>
      <dw-currency-format value="0" currency="INR"></dw-currency-format><br>
    </div>`
  }
}

window.customElements.define('dw-currency-demo', DwCurrencyDemo);