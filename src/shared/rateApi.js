import { handleResponse, handleError } from "./apiUtils";
const url = "http://localhost:3000/rates/";

export function getExchangeRates() {
  return fetch(url)
    .then(handleResponse)
    .catch(handleError);
}

export function saveExchangeRate(exchangeRate) {
  return fetch(url + (exchangeRate.id || ""), {
    method: exchangeRate.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(exchangeRate),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteExchangeRate(exchangeRateId) {
  return fetch(url + exchangeRateId, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}
