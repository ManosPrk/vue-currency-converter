<template>
  <div class="section content-title-group" v-if="currency">
    <h2 class="title">{{ currency.id ? "Update" : "Add" }} Currency</h2>
    <div class="card-content">
      <div class="content">
        <div class="field">
          <label class="label">ID</label>
          <div class="control">
            <label type="text" class="input" readonly>{{ currency.id }}</label>
          </div>
        </div>
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input type="text" class="input" v-model="currency.name" />
          </div>
        </div>
        <div class="field">
          <label class="label">IsoCode</label>
          <div class="control">
            <input type="text" class="input" v-model="currency.isoCode" />
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <button
          class="link card-footer-item cancel-button has-background-warning"
          @click="cancelCurrency()"
        >
          <i class="fas fa-undo"></i>
          <span>Cancel</span>
        </button>
        <button
          class="link card-footer-item has-background-primary"
          @click="onFormSubmit"
        >
          <i class="fas fa-save"></i>
          <span>Save</span>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ManageCurrency",
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      errors: undefined,
      currency: undefined,
    };
  },
  created() {
    if (!this.id) {
      this.currency = {
        id: undefined,
        name: "",
        isoCode: "",
      };
      return;
    }
    this.currency = { ...this.getCurrencyById(this.id) };
  },
  methods: {
    ...mapActions(["loadCurrencies", "saveCurrency"]),
    onFormSubmit() {
      if (!this.formIsValid()) {
        this.$notify({
          text:
            "Missing required value(s): " +
            Object.values(this.errors).join(", "),
        });
        return;
      }
      this.saveCurrency(this.currency).then(() => {
        this.$notify({
          text: `Currency with ID ${this.currency.id} successfully saved`,
        });
        this.$router.push({ name: "currency-list" });
      });
    },
    cancelCurrency() {
      this.$router.push({ name: "currency-list" });
    },
    formIsValid() {
      const newErrors = {};

      if (!this.currency.name) newErrors.name = "Name";
      if (!this.currency.isoCode) newErrors.isoCode = "ISO code";

      this.errors = newErrors;
      return Object.keys(this.errors).length === 0;
    },
  },
  computed: {
    ...mapGetters(["getCurrencyById"]),
  },
};
</script>

<style lang="scss" scoped></style>
