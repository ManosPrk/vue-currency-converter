import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:3000/currencies/";

export function getCurrencies() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveCurrency(currency) {
  return fetch(baseUrl + (currency.id || ""), {
    method: currency.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...currency }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCurrency(currencyId) {
  return fetch(baseUrl + currencyId, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}
