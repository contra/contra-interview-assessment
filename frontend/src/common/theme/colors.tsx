const red = {
  red: '#e71e3d',
  red80: '#ec4b64',
  red60: '#f1788b',
  red40: '#f5a5b1',
  red20: '#fad2d8',
  red10: '#fce8eb',
}
const black = {
  black: '#000000',
  black80: '#333333',
  black70: '#4c4c4c',
  black60: '#666666',
  black40: '#999999',
  black20: '#cccccc',
}
const navy = {
  navy: '#1b0076',
  navy80: '#493391',
  navy60: '#7666ad',
  navy40: '#a499c8',
  navy20: '#d1cce4',
  navy10: '#e8e5f1',
}
const blue = {
  blue: '#057bad',
  blue80: '#3795bd',
  blue60: '#69b0ce',
  blue40: '#9bcade',
  blue20: '#cde5ef',
  blue10: '#e6f1f6',
}
const gray = {
  gray1: '#f7fafc',
  gray2: '#f2f5f7',
  gray3: '#e6e9eb',
  gray4: '#dcdfe0',
}
const yellow = {
  yellow: '#ffcf21',
  yellow80: '#ffd94d',
  yellow60: '#ffe27a',
  yellow40: '#ffeca6',
  yellow20: '#fff5d3',
  yellow10: '#fffae8',
}
const green = {
  green: '#00bd68',
  green80: '#33ca86',
  green60: '#66d7a4',
  green40: '#99e4c3',
  green20: '#ccf2e1',
  green10: '#e5f8ef',
}
const error = { error: '#e45c52', error40: '#f4beba', error10: '#fceeed' }

export const colors = {
  gradient: 'linear-gradient(45deg, #1B0076 0%, #E71E3D 100%)',
  gradientLight: 'linear-gradient(90deg, #8D7FBA 0%, #F38E9E 100%)',
  white: '#ffffff',
  ...gray,
  ...navy,
  ...blue,
  ...black,
  ...red,
  ...yellow,
  ...green,
  ...error,
}
