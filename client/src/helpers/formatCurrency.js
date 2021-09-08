export function formatCurrency({ amount, symbol = '', decimals = 0, decimal = ".", thousands = "," }) {
  try {
    decimals = Math.abs(decimals);
    decimals = isNaN(decimals) ? 2 : decimals;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimals)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return symbol + negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimals ? decimal + Math.abs(amount - i).toFixed(decimals).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};

// export const formatCurrencyDefault = ({ amount, symbol }) => formatCurrency({ amount, decimals: 0, symbol: '' });
