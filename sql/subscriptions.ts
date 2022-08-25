export const create = (
  isDiscount: boolean,
  isTax: boolean,
  isAddress: boolean
) => {
  let disStr = {
    dis: "$6",
    label: "discount",
  }
  let taxStr = {
    tax: "$7",
    label: "tax",
  }
  // To check whether to add a comma or no
  if (isTax) {
    disStr = {
      dis: "$6,",
      label: "discount,",
    }
  }
  if (isAddress) {
    taxStr = {
      tax: "$7,",
      label: "tax,",
    }
  }

  return `
  INSERT INTO subscriptions (invoiceid, userid, provider, price, total, ${
    isDiscount ? disStr.label : ""
  } ${isTax ? taxStr.label : ""} ${
    isAddress ? "address" : ""
  }) VALUES ($1, $2, $3, $4, $5, ${isDiscount ? disStr.dis : ""} ${
    isTax ? taxStr.tax : ""
  } ${isAddress ? "$8" : ""}) RETURNING *
  `
}
