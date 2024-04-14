export const getPriceWithCurrency = (currency: string, price: number) => {
  const locale = browser.i18n.getUILanguage();

  return Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(price);
};
