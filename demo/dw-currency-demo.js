/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { css, LitElement, html } from 'lit-element';
import { DwCurrency } from '../dw-currency';
import { merge, mapValues } from 'lodash-es';
import "../dw-currency-format";
import { currencyHash } from '../currency';
/**
 * Setting config for app
 */
DwCurrency.setConfig(mapValues(currencyHash, (value) => {
  return merge(value, {
    thousandSeparator: ',',
    decimalSeparator: '.',
    thousandSpacing: '2s',
    valueDivider: 100,
  })
}));

DwCurrency.setDefaultCurrency('USD');
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

  render() {
    return html`<div>
      <dw-currency-format value="112869866"></dw-currency-format>
      <dw-currency-format></dw-currency-format>
      <dw-currency-format value="-110032" currency="USD"></dw-currency-format>
      <dw-currency-format value="112869866" currency="INR"></dw-currency-format>
      <dw-currency-format value="11040" currency="GBP"></dw-currency-format>
      <dw-currency-format value="-110032" currency="EGP"></dw-currency-format>

      <dw-currency-format value="11040" currency="HUF"></dw-currency-format>
      <dw-currency-format value="110032" currency="KGS"></dw-currency-format>
      <dw-currency-format value="112869866.8888" currency="LAK"></dw-currency-format>
      <dw-currency-format value="-11040" currency="MNT"></dw-currency-format>
      <dw-currency-format value="110032" currency="NPR"></dw-currency-format>
      <dw-currency-format value="-112869866" currency="SAR"></dw-currency-format>
      <dw-currency-format value="11040" currency="TJS"></dw-currency-format>


      <h1> Without currency symbol</h1>
      <dw-currency-format value="112869866" currency="EUR" noSymbol></dw-currency-format>
      <dw-currency-format value="-110032" currency="USD" noSymbol></dw-currency-format>
      <dw-currency-format value="112869866" currency="INR" noSymbol></dw-currency-format>
      <dw-currency-format value="11040" currency="GBP" noSymbol></dw-currency-format>
      <dw-currency-format value="-110032" currency="EGP" noSymbol></dw-currency-format>


      <h1> Without decimal points </h1>
      <dw-currency-format value="11040" currency="HUF" noDecimals></dw-currency-format>
      <dw-currency-format value="110032" currency="KGS" noDecimals></dw-currency-format>
      <dw-currency-format value="112869866.8888" currency="LAK" noDecimals></dw-currency-format>
      <dw-currency-format value="-11040" currency="MNT" noDecimals></dw-currency-format>
      <dw-currency-format value="110032" currency="NPR" noDecimals></dw-currency-format>
      <dw-currency-format value="-112869866" currency="SAR" noDecimals></dw-currency-format>
      <dw-currency-format value="11040" currency="TJS" noDecimals></dw-currency-format>


      <h1>With hide negative sign</h1>
        <h4>With negative amount</h4>
      <dw-currency-format value="-112869866" currency="EUR" hideNegativeSign></dw-currency-format>
      <dw-currency-format value="-110032" currency="USD" hideNegativeSign></dw-currency-format>
      <dw-currency-format value="-112869866" currency="INR" hideNegativeSign></dw-currency-format>
      <dw-currency-format value="-11040" currency="GBP" hideNegativeSign></dw-currency-format>
      <dw-currency-format value="-110032" currency="EGP" hideNegativeSign></dw-currency-format>
      <dw-currency-format value="-11040" currency="HUF" hideNegativeSign></dw-currency-format>
      <dw-currency-format value="-110032" currency="KGS" hideNegativeSign></dw-currency-format>
    </div>`
  }
}

window.customElements.define('dw-currency-demo', DwCurrencyDemo);