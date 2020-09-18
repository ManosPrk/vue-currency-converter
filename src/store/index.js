import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as currencyApi from "../shared/currencyApi";
import * as rateApi from "../shared/rateApi";
import {
  ADD_CURRENCY,
  DELETE_CURRENCY,
  GET_CURRENCIES,
  GET_RATES,
  UPDATE_CURRENCY,
  ADD_RATE,
  UPDATE_RATE,
  DELETE_RATE,
} from "./mutation-types";

Vue.use(Vuex);

const state = () => ({
  currencies: [],
  rates: [],
});

const mutations = {
  [GET_CURRENCIES](state, currencies) {
    state.currencies = currencies;
  },
  [ADD_CURRENCY](state, currency) {
    state.currencies.unshift(currency);
  },
  [UPDATE_CURRENCY](state, currency) {
    const index = state.currencies.findIndex((c) => c.id === currency.id);
    state.currencies = [...state.currencies.splice(index, 1, currency)];
  },
  [DELETE_CURRENCY](state, currencyId) {
    state.currencies = [...state.currencies.filter((c) => c.id !== currencyId)];
  },
  [GET_RATES](state, rates) {
    state.rates = rates;
  },
  [ADD_RATE](state, rate) {
    state.rates.unshift(rate);
  },
  [UPDATE_RATE](state, rate) {
    const index = state.rates.findIndex((c) => c.id === rate.id);
    state.rates = [...state.rates.splice(index, 1, rate)];
  },
  [DELETE_RATE](state, rateId) {
    state.rates = [...state.rates.filter((c) => c.id !== rateId)];
  },
};

const actions = {
  async saveCurrency({ commit }, currency) {
    const savedCurrency = await currencyApi.saveCurrency(currency);
    currency.id
      ? commit(UPDATE_CURRENCY, savedCurrency)
      : commit(ADD_CURRENCY, savedCurrency);
  },
  async deleteCurrency({ commit }, currencyId) {
    currencyApi.deleteCurrency(currencyId);
    commit(DELETE_CURRENCY, currencyId);
  },
  async loadCurrencies({ commit }) {
    const currencies = await currencyApi.getCurrencies();
    commit(GET_CURRENCIES, currencies);
  },
  async saveRate({ commit }, rate) {
    const savedRate = await rateApi.saveExchangeRate(rate);
    rate.id ? commit(UPDATE_RATE, savedRate) : commit(ADD_RATE, savedRate);
  },
  async deleteRate({ commit }, rateId) {
    rateApi.deleteExchangeRate(rateId);
    commit(DELETE_RATE, rateId);
  },
  async loadRates({ commit }) {
    const rates = await rateApi.getExchangeRates();
    commit(GET_RATES, rates);
  },
};

const getters = {
  getCurrencyById: (state) => (id) => state.currencies.find((c) => c.id === id),
  getRateById: (state) => (id) => state.rates.find((r) => r.id === id),
};

export default new Vuex.Store({
  plugins: [createPersistedState()],
  strict: process.env.NODE_ENV !== "production",
  state,
  mutations,
  actions,
  getters,
});
