import { merge, mapValues } from 'lodash-es';
const oCurrency = {
  "AED": {
    "displayName": "AED - UAE dirham",
    "symbol": "د.إ;"
  },
  "AFN": {
    "displayName": "AFN - Afghan afghani",
    "symbol": "Afs"
  },
  "ALL": {
    "displayName": "ALL - Albanian lek",
    "symbol": "L"
  },
  "AMD": {
    "displayName": "AMD - Armenian dram",
    "symbol": "AMD"
  },
  "ANG": {
    "displayName": "ANG - Netherlands Antillean gulden",
    "symbol": "NAƒ"
  },
  "AOA": {
    "displayName": "AOA - Angolan kwanza",
    "symbol": "Kz"
  },
  "ARS": {
    "displayName": "ARS - Argentine peso",
    "symbol": "$"
  },
  "AUD": {
    "displayName": "AUD - Australian dollar",
    "symbol": "$"
  },
  "AWG": {
    "displayName": "AWG - Aruban florin",
    "symbol": "ƒ"
  },
  "AZN": {
    "displayName": "AZN - Azerbaijani manat",
    "symbol": "AZN"
  },
  "BAM": {
    "displayName": "BAM - Bosnia and Herzegovina konvertibilna marka",
    "symbol": "KM"
  },
  "BBD": {
    "displayName": "BBD - Barbadian dollar",
    "symbol": "Bds$"
  },
  "BDT": {
    "displayName": "BDT - Bangladeshi taka",
    "symbol": "৳"
  },
  "BGN": {
    "displayName": "BGN - Bulgarian lev",
    "symbol": "BGN"
  },
  "BHD": {
    "displayName": "BHD - Bahraini dinar",
    "symbol": ".د.ب"
  },
  "BIF": {
    "displayName": "BIF - Burundi franc",
    "symbol": "FBu"
  },
  "BMD": {
    "displayName": "BMD - Bermudian dollar",
    "symbol": "BD$"
  },
  "BND": {
    "displayName": "BND - Brunei dollar",
    "symbol": "B$"
  },
  "BOB": {
    "displayName": "BOB - Bolivian boliviano",
    "symbol": "Bs."
  },
  "BRL": {
    "displayName": "BRL - Brazilian real",
    "symbol": "R$"
  },
  "BSD": {
    "displayName": "BSD - Bahamian dollar",
    "symbol": "B$"
  },
  "BTN": {
    "displayName": "BTN - Bhutanese ngultrum",
    "symbol": "Nu."
  },
  "BWP": {
    "displayName": "BWP - Botswana pula",
    "symbol": "P"
  },
  "BYR": {
    "displayName": "BYR - Belarusian ruble",
    "symbol": "Br"
  },
  "BZD": {
    "displayName": "BZD - Belize dollar",
    "symbol": "BZ$"
  },
  "CAD": {
    "displayName": "CAD - Canadian dollar",
    "symbol": "$"
  },
  "CDF": {
    "displayName": "CDF - Congolese franc",
    "symbol": "F"
  },
  "CHF": {
    "displayName": "CHF - Swiss franc",
    "symbol": "Fr."
  },
  "CLP": {
    "displayName": "CLP - Chilean peso",
    "symbol": "$"
  },
  "CNY": {
    "displayName": "CNY - Chinese/Yuan renminbi",
    "symbol": "¥"
  },
  "COP": {
    "displayName": "COP - Colombian peso",
    "symbol": "Col$"
  },
  "CRC": {
    "displayName": "CRC - Costa Rican colon",
    "symbol": "₡"
  },
  "CUC": {
    "displayName": "CUC - Cuban peso",
    "symbol": "$"
  },
  "CVE": {
    "displayName": "CVE - Cape Verdean escudo",
    "symbol": "Esc"
  },
  "CZK": {
    "displayName": "CZK - Czech koruna",
    "symbol": "Kč"
  },
  "DJF": {
    "displayName": "DJF - Djiboutian franc",
    "symbol": "Fdj"
  },
  "DKK": {
    "displayName": "DKK - Danish krone",
    "symbol": "Kr"
  },
  "DOP": {
    "displayName": "DOP - Dominican peso",
    "symbol": "RD$"
  },
  "DZD": {
    "displayName": "DZD - Algerian dinar",
    "symbol": "د.ج"
  },
  "EEK": {
    "displayName": "EEK - Estonian kroon",
    "symbol": "KR"
  },
  "EGP": {
    "displayName": "EGP - Egyptian pound",
    "symbol": "£"
  },
  "ERN": {
    "displayName": "ERN - Eritrean nakfa",
    "symbol": "Nfa"
  },
  "ETB": {
    "displayName": "ETB - Ethiopian birr",
    "symbol": "Br"
  },
  "EUR": {
    "displayName": "EUR - European Euro",
    "symbol": "€"
  },
  "FJD": {
    "displayName": "FJD - Fijian dollar",
    "symbol": "FJ$"
  },
  "FKP": {
    "displayName": "FKP - Falkland Islands pound",
    "symbol": "£"
  },
  "GBP": {
    "displayName": "GBP - British pound",
    "symbol": "£"
  },
  "GEL": {
    "displayName": "GEL - Georgian lari",
    "symbol": "GEL"
  },
  "GHS": {
    "displayName": "GHS - Ghanaian cedi",
    "symbol": "GH₵"
  },
  "GIP": {
    "displayName": "GIP - Gibraltar pound",
    "symbol": "£"
  },
  "GMD": {
    "displayName": "GMD - Gambian dalasi",
    "symbol": "D"
  },
  "GNF": {
    "displayName": "GNF - Guinean franc",
    "symbol": "FG"
  },
  "GQE": {
    "displayName": "GQE - Central African CFA franc",
    "symbol": "CFA"
  },
  "GTQ": {
    "displayName": "GTQ - Guatemalan quetzal",
    "symbol": "Q"
  },
  "GYD": {
    "displayName": "GYD - Guyanese dollar",
    "symbol": "GY$"
  },
  "HKD": {
    "displayName": "HKD - Hong Kong dollar",
    "symbol": "HK$"
  },
  "HNL": {
    "displayName": "HNL - Honduran lempira",
    "symbol": "L"
  },
  "HRK": {
    "displayName": "HRK - Croatian kuna",
    "symbol": "kn"
  },
  "HTG": {
    "displayName": "HTG - Haitian gourde",
    "symbol": "G"
  },
  "HUF": {
    "displayName": "HUF - Hungarian forint",
    "symbol": "Ft"
  },
  "IDR": {
    "displayName": "IDR - Indonesian rupiah",
    "symbol": "Rp"
  },
  "ILS": {
    "displayName": "ILS - Israeli new sheqel",
    "symbol": "₪"
  },
  "INR": {
    "displayName": "INR - Indian rupee",
    "symbol": "₹"
  },
  "IQD": {
    "displayName": "IQD - Iraqi dinar",
    "symbol": "د.ع"
  },
  "IRR": {
    "displayName": "IRR - Iranian rial",
    "symbol": "IRR"
  },
  "ISK": {
    "displayName": "ISK - Icelandic króna",
    "symbol": "kr"
  },
  "JMD": {
    "displayName": "JMD - Jamaican dollar",
    "symbol": "J$"
  },
  "JOD": {
    "displayName": "JOD - Jordanian dinar",
    "symbol": "JOD"
  },
  "JPY": {
    "displayName": "JPY - Japanese yen",
    "symbol": "¥"
  },
  "KES": {
    "displayName": "KES - Kenyan shilling",
    "symbol": "KSh"
  },
  "KGS": {
    "displayName": "KGS - Kyrgyzstani som",
    "symbol": "сом"
  },
  "KHR": {
    "displayName": "KHR - Cambodian riel",
    "symbol": "៛"
  },
  "KMF": {
    "displayName": "KMF - Comorian franc",
    "symbol": "KMF"
  },
  "KPW": {
    "displayName": "KPW - North Korean won",
    "symbol": "W"
  },
  "KRW": {
    "displayName": "KRW - South Korean won",
    "symbol": "W"
  },
  "KWD": {
    "displayName": "KWD - Kuwaiti dinar",
    "symbol": "KWD"
  },
  "KYD": {
    "displayName": "KYD - Cayman Islands dollar",
    "symbol": "KY$"
  },
  "KZT": {
    "displayName": "KZT - Kazakhstani tenge",
    "symbol": "T"
  },
  "LAK": {
    "displayName": "LAK - Lao kip",
    "symbol": "KN"
  },
  "LBP": {
    "displayName": "LBP - Lebanese lira",
    "symbol": "£"
  },
  "LKR": {
    "displayName": "LKR - Sri Lankan rupee",
    "symbol": "Rs"
  },
  "LRD": {
    "displayName": "LRD - Liberian dollar",
    "symbol": "L$"
  },
  "LSL": {
    "displayName": "LSL - Lesotho loti",
    "symbol": "M"
  },
  "LTL": {
    "displayName": "LTL - Lithuanian litas",
    "symbol": "Lt"
  },
  "LVL": {
    "displayName": "LVL - Latvian lats",
    "symbol": "Ls"
  },
  "LYD": {
    "displayName": "LYD - Libyan dinar",
    "symbol": "LD"
  },
  "MAD": {
    "displayName": "MAD - Moroccan dirham",
    "symbol": "MAD"
  },
  "MDL": {
    "displayName": "MDL - Moldovan leu",
    "symbol": "MDL"
  },
  "MGA": {
    "displayName": "MGA - Malagasy ariary",
    "symbol": "FMG"
  },
  "MKD": {
    "displayName": "MKD - Macedonian denar",
    "symbol": "MKD"
  },
  "MMK": {
    "displayName": "MMK - Myanma kyat",
    "symbol": "K"
  },
  "MNT": {
    "displayName": "MNT - Mongolian tugrik",
    "symbol": "₮"
  },
  "MOP": {
    "displayName": "MOP - Macanese pataca",
    "symbol": "P"
  },
  "MRO": {
    "displayName": "MRO - Mauritanian ouguiya",
    "symbol": "UM"
  },
  "MUR": {
    "displayName": "MUR - Mauritian rupee",
    "symbol": "Rs"
  },
  "MVR": {
    "displayName": "MVR - Maldivian rufiyaa",
    "symbol": "Rf"
  },
  "MWK": {
    "displayName": "MWK - Malawian kwacha",
    "symbol": "MK"
  },
  "MXN": {
    "displayName": "MXN - Mexican peso",
    "symbol": "$"
  },
  "MYR": {
    "displayName": "MYR - Malaysian ringgit",
    "symbol": "RM"
  },
  "MZM": {
    "displayName": "MZM - Mozambican metical",
    "symbol": "MTn"
  },
  "NAD": {
    "displayName": "NAD - Namibian dollar",
    "symbol": "N$"
  },
  "NGN": {
    "displayName": "NGN - Nigerian naira",
    "symbol": "₦"
  },
  "NIO": {
    "displayName": "NIO - Nicaraguan córdoba",
    "symbol": "C$"
  },
  "NOK": {
    "displayName": "NOK - Norwegian krone",
    "symbol": "kr"
  },
  "NPR": {
    "displayName": "NPR - Nepalese rupee",
    "symbol": "NRs"
  },
  "NZD": {
    "displayName": "NZD - New Zealand dollar",
    "symbol": "NZ$"
  },
  "OMR": {
    "displayName": "OMR - Omani rial",
    "symbol": "OMR"
  },
  "PAB": {
    "displayName": "PAB - Panamanian balboa",
    "symbol": "B./"
  },
  "PEN": {
    "displayName": "PEN - Peruvian nuevo sol",
    "symbol": "S/."
  },
  "PGK": {
    "displayName": "PGK - Papua New Guinean kina",
    "symbol": "K"
  },
  "PHP": {
    "displayName": "PHP - Philippine peso",
    "symbol": "₱"
  },
  "PKR": {
    "displayName": "PKR - Pakistani rupee",
    "symbol": "Rs."
  },
  "PLN": {
    "displayName": "PLN - Polish zloty",
    "symbol": "zł"
  },
  "PYG": {
    "displayName": "PYG - Paraguayan guarani",
    "symbol": "₲"
  },
  "QAR": {
    "displayName": "QAR - Qatari riyal",
    "symbol": "QR"
  },
  "RON": {
    "displayName": "RON - Romanian leu",
    "symbol": "L"
  },
  "RSD": {
    "displayName": "RSD - Serbian dinar",
    "symbol": "din."
  },
  "RUB": {
    "displayName": "RUB - Russian ruble",
    "symbol": "R"
  },
  "SAR": {
    "displayName": "SAR - Saudi riyal",
    "symbol": "SR"
  },
  "SBD": {
    "displayName": "SBD - Solomon Islands dollar",
    "symbol": "SI$"
  },
  "SCR": {
    "displayName": "SCR - Seychellois rupee",
    "symbol": "SR"
  },
  "SDG": {
    "displayName": "SDG - Sudanese pound",
    "symbol": "SDG"
  },
  "SEK": {
    "displayName": "SEK - Swedish krona",
    "symbol": "kr"
  },
  "SGD": {
    "displayName": "SGD - Singapore dollar",
    "symbol": "S$"
  },
  "SHP": {
    "displayName": "SHP - Saint Helena pound",
    "symbol": "£"
  },
  "SLL": {
    "displayName": "SLL - Sierra Leonean leone",
    "symbol": "Le"
  },
  "SOS": {
    "displayName": "SOS - Somali shilling",
    "symbol": "Sh."
  },
  "SRD": {
    "displayName": "SRD - Surinamese dollar",
    "symbol": "$"
  },
  "SYP": {
    "displayName": "SYP - Syrian pound",
    "symbol": "LS"
  },
  "SZL": {
    "displayName": "SZL - Swazi lilangeni",
    "symbol": "E"
  },
  "THB": {
    "displayName": "THB - Thai baht",
    "symbol": "฿"
  },
  "TJS": {
    "displayName": "TJS - Tajikistani somoni",
    "symbol": "TJS"
  },
  "TMT": {
    "displayName": "TMT - Turkmen manat",
    "symbol": "m"
  },
  "TND": {
    "displayName": "TND - Tunisian dinar",
    "symbol": "DT"
  },
  "TRY": {
    "displayName": "TRY - Turkish new lira",
    "symbol": "TRY"
  },
  "TTD": {
    "displayName": "TTD - Trinidad and Tobago dollar",
    "symbol": "TT$"
  },
  "TWD": {
    "displayName": "TWD - New Taiwan dollar",
    "symbol": "NT$"
  },
  "TZS": {
    "displayName": "TZS - Tanzanian shilling",
    "symbol": "TZS"
  },
  "UAH": {
    "displayName": "UAH - Ukrainian hryvnia",
    "symbol": "UAH"
  },
  "UGX": {
    "displayName": "UGX - Ugandan shilling",
    "symbol": "USh"
  },
  "USD": {
    "displayName": "USD - United States dollar",
    "symbol": "US$"
  },
  "UYU": {
    "displayName": "UYU - Uruguayan peso",
    "symbol": "$U"
  },
  "UZS": {
    "displayName": "UZS - Uzbekistani som",
    "symbol": "UZS"
  },
  "VEB": {
    "displayName": "VEB - Venezuelan bolivar",
    "symbol": "Bs"
  },
  "VND": {
    "displayName": "VND - Vietnamese dong",
    "symbol": "₫"
  },
  "VUV": {
    "displayName": "VUV - Vanuatu vatu",
    "symbol": "VT"
  },
  "WST": {
    "displayName": "WST - Samoan tala",
    "symbol": "WS$"
  },
  "XAF": {
    "displayName": "XAF - Central African CFA franc",
    "symbol": "CFA"
  },
  "XCD": {
    "displayName": "XCD - East Caribbean dollar",
    "symbol": "EC$"
  },
  "XDR": {
    "displayName": "XDR - Special Drawing Rights",
    "symbol": "SDR"
  },
  "XOF": {
    "displayName": "XOF - West African CFA franc",
    "symbol": "CFA"
  },
  "XPF": {
    "displayName": "XPF - CFP franc",
    "symbol": "F"
  },
  "YER": {
    "displayName": "YER - Yemeni rial",
    "symbol": "YER"
  },
  "ZAR": {
    "displayName": "ZAR - South African rand",
    "symbol": "R"
  },
  "ZMK": {
    "displayName": "ZMK - Zambian kwacha",
    "symbol": "ZK"
  },
  "ZWR": {
    "displayName": "ZWR - Zimbabwean dollar",
    "symbol": "Z$"
  }
};

// Default config added
export const currencyHash = mapValues(oCurrency, (value) => {
  return merge(value, {
    thousandSeparator: ',',
    decimalSeparator: '.',
    thousandSpacing: '2s',
    valueDivider: 1
  })
});