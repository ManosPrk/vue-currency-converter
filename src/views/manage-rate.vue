
<template>
  <div class="section content-title-group" v-if="rate && currencies">
    <h2 class="title">Manage Rate</h2>
    <div class="card-content">
      <div class="content">
        <div class="field">
          <label class="label">ID</label>
          <div class="control">
            <label type="text" class="input" readonly>{{ rate.id }}</label>
          </div>
        </div>
        <div class="field">
          <label class="label">From</label>
          <div class="select control">
            <select
              :disabled="rate.id"
              :class="{ 'is-danger': errors.from }"
              name
              id
              v-model="rate.from"
            >
              <option value>From Currency...</option>
              <option
                v-for="currency in currencies"
                :value="currency.id"
                :key="currency.id"
              >{{ currency.isoCode }}</option>
            </select>
            <span class="help is-danger">{{ errors.from }}</span>
          </div>
        </div>
        <div class="field">
          <label class="label">To</label>
          <div class="select control">
            <select
              :disabled="rate.id"
              :class="{ 'is-danger': errors.from }"
              name
              id
              v-model="rate.to"
            >
              <option value>To Currency...</option>
              <option
                v-for="currency in currencies"
                :value="currency.id"
                :key="currency.id"
              >{{ currency.isoCode }}</option>
            </select>
            <span class="help is-danger">{{ errors.from }}</span>
          </div>
        </div>
        <div class="field">
          <label class="label">Ratio</label>
          <div class="control">
            <input type="number" class="input" v-model="rate.ratio" />
            <span class="help is-danger">{{ errors.ratio }}</span>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <button
          class="link card-footer-item cancel-button has-background-warning"
          @click="cancelRate"
        >
          <i class="fas fa-undo"></i>
          <span>Cancel</span>
        </button>
        <button class="link card-footer-item has-background-primary" @click="onFormSubmit">
          <i class="fas fa-save"></i>
          <span>Save</span>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "ManageRates",
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      rate: {},
      errors: {},
    };
  },
  methods: {
    ...mapActions(["loadRates", "loadCurrencies", "saveRate"]),
    onFormSubmit() {
      if (!this.formIsValid()) {
        this.$notify({
          text:
            "Missing required value(s): " +
            Object.values(this.errors).join(", "),
        });
        return;
      }
      this.saveRate(this.rateToSave()).then(() => {
        this.$notify({
          text: `Rate successfully saved`,
        });
        this.$router.push({ name: "rate-list" });
      });
    },
    cancelRate() {
      this.$router.push({ name: "rate-list" });
    },
    formIsValid() {
      const newErrors = {};

      if (!this.rate.ratio) newErrors.ratio = "Ratio is required";
      if (!this.rate.to) newErrors.to = "To currency is required";
      if (!this.rate.from) newErrors.from = "From Currency is required";

      this.errors = newErrors;

      return Object.keys(this.errors).length === 0;
    },
    rateToSave() {
      const rate = { ...this.getRateById(this.id) };
      if (!this.rate.id) {
        rate.base = this.currencies.find((c) => c.id === this.rate.from);
        rate.target = this.currencies.find((c) => c.id === this.rate.to);
      }
      rate.ratio = this.rate.ratio;
      return rate;
    },
  },
  mounted() {
    if (this.currencies.length === 0) {
      this.loadCurrencies();
    }
  },
  created() {
    if (!this.id) {
      this.rate = {
        id: undefined,
        from: 0,
        to: 0,
        ratio: 0,
      };
      return;
    }
    const currentRate = { ...this.getRateById(this.id) };
    this.rate = {
      id: currentRate.id,
      from: currentRate.target.id,
      to: currentRate.base.id,
      ratio: currentRate.ratio,
    };
  },
  computed: {
    ...mapState(["currencies", "rates"]),
    ...mapGetters(["getRateById"]),
  },
};
</script>

<style lang="scss" scoped>
</style>