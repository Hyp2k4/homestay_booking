const formatCurrency = (amount) => {
  const numericAmount = Number(amount);
  if (isNaN(numericAmount)) return '0 VND';

  return `${numericAmount.toLocaleString('vi-VN', { maximumFractionDigits: 0 })}`;
};

export default formatCurrency;
