import { currencyHash } from './currency';
import { merge } from 'lodash-es';
export class DwCurrency {

  /**
   * Format a currency value to the String
   * @param {Object} config - Format config
   *   @param {String} value - Value that format
   *   @param {String} currency- ISO code of the Currency
   *   @param {Boolean} noDecimals- True to hide decimal points
   *   @param {Boolean} hideNegativeSign -True to show minus sign
   * @return {String} -returned with formated string
   */
  static formatCurrency(config) {
    let { value, currency, noDecimals, hideNegativeSign, } = config;
    return this.applyConfig(value, currency, noDecimals, hideNegativeSign);
  }

  /**
   * Sets config
   * @param {Object} config
   */
  static setConfig(config) {
    this._config = merge(currencyHash, config);
  }
  /**
   * Get currency config
   */
  static getConfig(currency) {
    return this._config ? this._config[currency] : currencyHash[currency];
  }

  /**
   * Invoked for getting currency symbol
   * @param {String} currency -ISO code of currency
   * @return {String} -Returns with string
   */
  static getSymbol(currency) {
    let config = this.getConfig(currency);
    return config && config.symbol ? config.symbol : '';
  }

  /**
   * Invoked for apply given config
   * @param {String} value - Currency amount
   * @param {String} currency - Iso code of currency
   * @param {Boolean} noDecimals - True to hide all decimal points
   * @param {Boolean} hideNegativeSign - true to hide sign of negative amount
   * @return {String} returns string with applied config
   */
  static applyConfig(value, currency, noDecimals, hideNegativeSign) {
    //Getting config from currency object
    let { thousandSeparator, decimalSeparator, thousandSpacing, decimalPoints, valueDivider } = this.getConfig(currency);

    // Value is divided with config value otherwise its divided with 1
    value = (value / (valueDivider || 1)).toString();

    // Splitting string in two parts beforeDecimal and afterDecimal
    let { beforeDecimal, afterDecimal, addNegativeSign } = this.splitDecimal(value, hideNegativeSign);

    // Decimal points
    if (decimalPoints !== null && afterDecimal) {
      afterDecimal = this.limitToScale(afterDecimal, 2);
    }
    //Thousand separator saparate string and appended with thousandSeparator
    if (thousandSeparator) {
      beforeDecimal = this.formatThousand(beforeDecimal, thousandSeparator, thousandSpacing);
    }
    // Checks value has float value
    const hasDecimalSeparator = value.indexOf('.') !== -1;

    //restore negative sign
    if (addNegativeSign) {
      beforeDecimal = '-' + beforeDecimal;
    }

    // Saparate amount with decimal separator config
    // If noDecimals config is true then decimal points is not appended
    return `${beforeDecimal}${hasDecimalSeparator && decimalSeparator || ''}${noDecimals ? '' : afterDecimal}`;
  }

  /**
   * limit decimal numbers to given scale
   * Not used .fixedTo because that will break with big numbers
   */
  static limitToScale(numStr, scale) {
    let str = ''
    for (let i = 0; i <= scale - 1; i++) {
      str += numStr[i] || '';
    }
    return str;
  }

  /**
   * Format the given string according to thousand separator and thousand spacing
   * @param {String} beforeDecimal -
   * @param {String} thousandSeparator
   * @param {String} thousandSpacing
   * @return {String} Returns with thousand saparate string
   */
  static formatThousand(beforeDecimal, thousandSeparator, thousandSpacing) {
    let digitalGroup;
    switch (thousandSpacing) {
      case '2':
        digitalGroup = /(\d)(?=(\d{2})+(?!\d))/g;
        break;
      case '2s':
        digitalGroup = /(\d)(?=(((\d{2})+)(\d{1})(?!\d)))/g;
        break;
      case '4':
        digitalGroup = /(\d)(?=(\d{4})+(?!\d))/g;
        break;
      default:
        digitalGroup = /(\d)(?=(\d{3})+(?!\d))/g;
    }
    return beforeDecimal.replace(digitalGroup, '$1' + thousandSeparator);
  }

  /**
   * Split number string into decimal
   * @param {String} numberStr- Number in string format
   * @param {Boolean} hideNegativeSign - true to show sign of negative amount
   * @return {Object} - Return with different props
   *  @param {String} beforeDecimal - beforeDecimal e.g if amount is 1000.15 then it stores 1000
   *  @param {String} afterDecimal - afterDecimal e.g if amount is 1000.15 then it stores 15
   *  @param {Boolean} addNegativeSign- true if amount is negative
   *
   */
  static splitDecimal(numberStr, hideNegativeSign) {
    //Checks string has minus sign
    const hasNegative = numberStr[0] === '-';
    const addNegativeSign = hasNegative && !hideNegativeSign;
    numberStr = numberStr.replace('-', '');
    const parts = numberStr.split('.');
    const beforeDecimal = parts[0];
    const afterDecimal = parts[1] || '';

    return {
      beforeDecimal,
      afterDecimal,
      addNegativeSign
    }
  }
}