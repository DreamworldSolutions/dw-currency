import currencyConfig from './currency-config';
import { merge } from 'lodash-es';

const defaultCurrencyConfig = {
  thousandSeparator: ',',
  decimalSeparator: '.',
  thousandSpacing: '2s',
  valueDivider: 1
};

export class DwCurrency {

  /**
   * Sets config, for all the currencies.
   * 
   * Actually, this method is used to either add a New currency to the config (not specified in currency-config.js) OR
   *  to change configuration of a specific currency.
   * 
   * Partial configuration (e.g. want to override 1 config value for a currency, but other values should be default) 
   * for a currency can't be modified, so User has to specify all the configurations for a currency. So, the
   * configuration property not specified by the currency will become blank/undefined.
   * @param {Object} config- Used for apply config for whole app
   */
  static setConfig(config) {
    this._config = merge(currencyConfig, config);
  }

  /**
   * Used to set default currency in whole application
   * Applicable when currency not passed into `formatCurrency` config
   * sets `_currency`
   * @param {Sting} currency- ISO Code of currency
   */
  static setDefaultCurrency(currency) {
    this._defaultCurrency = currency;
  }
  /**
   * Returns configuration of the requested currency.
   */
  static getCurrencyConfig(currency) {
    return merge({}, defaultCurrencyConfig, this._config[currency]);
  }

  /**
   * Get default currency. If not specified, it returns `INR`.
   */
  static getDefaultCurrency() {
    return this._defaultCurrency;
  }
  /**
   * Invoked for getting currency symbol
   * @param {String} currency -ISO code of currency
   * @return {String} -Returns with string
   */
  static getSymbol(currency) {
    let config = this.getCurrencyConfig(currency);
    return config && config.symbol ? config.symbol : '';
  }

  /**
   * Formats the given currency value as String. Note:: It doesn't include the currency symbol.
   *  You may need to manually add it.
   * @param {String|Object} value - Currency amount. If the first argument is the Object, then 
   *    other input params are ignored and considered that input is specified as the Object.
   * @param {String} currency - Iso code of currency
   * @param {Boolean} noDecimals - True to hide all decimal points
   * @param {Boolean} hideNegativeSign - true to hide sign of negative amount
   * @return {String} returns string with applied config
   */
  static format(value, currency, noDecimals, hideNegativeSign) {

    if (typeof value === 'object') {
      let args = value;
      value = args.value;
      currency = args.currency;
      noDecimals = args.noDecimals;
      hideNegativeSign = args.hideNegativeSign;
    }

    currency = currency || this.getDefaultCurrency();
    //Getting config from currency object
    let { thousandSeparator, decimalSeparator, thousandSpacing, decimalPoints,
      valueDivider } = this.getCurrencyConfig(currency);

    // Value is divided with config value otherwise its divided with 1
    value = (value / (valueDivider || 1)).toString();

    // Splitting string in two parts beforeDecimal and afterDecimal
    let { beforeDecimal, afterDecimal, addNegativeSign } = this._splitDecimal(value, hideNegativeSign);

    // Decimal points
    if (decimalPoints !== null && afterDecimal) {
      afterDecimal = this._limitToScale(afterDecimal, 2);
    }
    //Thousand separator saparate string and appended with thousandSeparator
    if (thousandSeparator) {
      beforeDecimal = this._formatThousand(beforeDecimal, thousandSeparator, thousandSpacing);
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
  static _limitToScale(numStr, scale) {
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
  static _formatThousand(beforeDecimal, thousandSeparator, thousandSpacing) {
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
  static _splitDecimal(numberStr, hideNegativeSign) {
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
};

DwCurrency.setDefaultCurrency('INR');
DwCurrency._config = currencyConfig;