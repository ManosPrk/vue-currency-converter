<template>
  <div>
    <div class="hero">
      <div class="hero-body">
        <h1 class="title">Manage Currencies</h1>
        <router-link
          class="button is-primary"
          :to="{ name: 'manage-currency', params: { id: 0 } }"
        >Add currency</router-link>
      </div>
    </div>
    <Table :columns="columns" :rows="rows" :updateRow="updateRow" :deleteRow="deleteRow" />
    <DeleteModal
      :itemToDelete="currencyToDelete"
      :cancelDelete="cancelDelete"
      :removeItem="removeCurrency"
      modalTitle="Remove Currency"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Table from "../components/table";
import DeleteModal from "../components/delete-modal";
export default {
  name: "CurrencyList",
  components: {
    Table,
    DeleteModal,
  },
  data() {
    return {
      currencyToDelete: undefined,
      columns: ["ID", "Name", "Iso Code", " ", ""],
      updateRow: {
        title: "Update",
        link: "manage-currency",
      },
      deleteRow: {
        title: "Delete",
        onClick: this.requestDelete,
      },
    };
  },
  methods: {
    ...mapActions(["loadCurrencies", "deleteCurrency"]),
    removeCurrency(id) {
      this.deleteCurrency(id);
      this.$notify({
        group: "app",
        text: "Currency successfully deleted!",
      });
      this.cancelDelete();
    },
    requestDelete(currency) {
      this.currencyToDelete = currency;
    },
    cancelDelete() {
      this.currencyToDelete = undefined;
    },
  },
  created() {
    this.loadCurrencies();
  },
  computed: {
    ...mapState(["currencies"]),
    rows() {
      return this.currencies.map((currency) => ({
        id: currency.id,
        name: currency.name,
        isoCode: currency.isoCode,
      }));
    },
  },
};
</script>

<style lang="scss" scoped></style>
