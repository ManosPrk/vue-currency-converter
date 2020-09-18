<template>
  <div>
    <div class="columns is-centered" v-if="rates" @submit="getResult">
      <div class="column is-8">
        <form id="converter-form">
          <div class="field is-grouped justify-center">
            <p class="control">
              <input
                :class="{ 'is-danger': errors.amount }"
                class="input"
                type="text"
                v-model="amount"
              />
              <span class="help is-danger">{{ errors.amount }}</span>
            </p>

            <div class="select control">
              <select
                :class="{ 'is-danger': errors.from }"
                name
                id
                v-model="from"
              >
                <option value>From Currency...</option>
                <option
                  v-for="currency in currencies"
                  :value="currency.id"
                  :key="currency.id"
                  >{{ currency.name }}</option
                >
              </select>
              <span class="help is-danger">{{ errors.from }}</span>
            </div>
            <div class="select control">
              <select :class="{ 'is-danger': errors.to }" v-model="to">
                <option value>To Currency...</option>
                <option
                  v-for="currency in currencies"
                  :value="currency.id"
                  :key="currency.id"
                  >{{ currency.name }}</option
                >
              </select>
              <span class="help is-danger">{{ errors.to }}</span>
            </div>
            <p class="control">
              <button class="button is-primary" type="submit">Submit</button>
            </p>
          </div>
        </form>
      </div>
    </div>
    <div class="has-text-centered" v-if="result">
      <h2 class="subtitle is-4">
        {{ result.baseAmount | formatCurrency(result.baseCode) }} =
      </h2>
      <h1 class="title is-1">
        {{ result.targetAmount | formatCurrency(result.targetCode) }}
      </h1>
    </div>
  </div>
</template>

<script>
import * as currencyApi from "../shared/currencyApi";
import * as rateApi from "../shared/rateApi";
export default {
  name: "ConverterPage",
  data() {
    return {
      currencies: undefined,
      rates: undefined,
      from: "",
      to: "",
      amount: 1,
      result: undefined,
      errors: {},
    };
  },
  async created() {
    this.currencies = await currencyApi.getCurrencies();
    this.rates = await rateApi.getExchangeRates();
  },
  methods: {
    getResult(e) {
      e.preventDefault();

      if (!this.formIsValid()) return;

      const { ratio, base, target } = this.rates.find(
        (r) => r.base.id === this.from && r.target.id === this.to
      );

      this.result = {
        baseAmount: this.amount,
        targetAmount: this.amount * ratio,
        baseCode: base.isoCode,
        targetCode: target.isoCode,
      };
    },
    formIsValid() {
      const newErrors = {};

      if (!this.amount) newErrors.amount = "Amount is required";
      if (!this.to) newErrors.to = "To currency is required";
      if (!this.from) newErrors.from = "From Currency is required";

      this.errors = newErrors;

      return Object.keys(this.errors).length === 0;
    },
  },
  filters: {
    keyToString: (val) => {
      return val.toString();
    },
    formatCurrency: (val, code) => {
      return val.toLocaleString(undefined, {
        style: "currency",
        currency: code,
      });
    },
  },
  updated() {
    console.log("updated");
  },
};
</script>

<style scoped>
.justify-center {
  justify-content: center !important;
}
</style>
