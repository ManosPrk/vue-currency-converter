<template>
  <div>
    <div class="hero">
      <div class="hero-body">
        <h1 class="title">Manage Rates</h1>
        <router-link
          class="button is-primary"
          :to="{ name: 'manage-rate', params: { id: 0 } }"
        >Add rate</router-link>
      </div>
    </div>
    <Table :columns="columns" :rows="rows" :updateRow="updateRow" :deleteRow="deleteRow" />
    <DeleteModal
      :itemToDelete="rateToDelete"
      :cancelDelete="cancelDelete"
      :removeItem="removeRate"
      modalTitle="Remove Rate"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Table from "../components/table";
import DeleteModal from "../components/delete-modal";
export default {
  name: "RateList",
  components: {
    Table,
    DeleteModal,
  },
  data() {
    return {
      rateToDelete: undefined,
      columns: ["ID", "From", "To", "Ratio", " ", ""],
      updateRow: {
        title: "Update",
        link: "manage-rate",
      },
      deleteRow: {
        title: "Delete",
        onClick: this.requestDelete,
      },
    };
  },
  methods: {
    ...mapActions(["loadRates", "deleteRate"]),
    removeRate(id) {
      this.deleteRate(id);
      this.$notify({
        group: "app",
        text: "Rate successfully deleted!",
      });
      this.cancelDelete();
    },
    requestDelete(rate) {
      this.rateToDelete = rate;
    },
    cancelDelete() {
      this.rateToDelete = undefined;
    },
  },
  created() {
    this.loadRates();
  },
  computed: {
    ...mapState(["rates"]),
    rows() {
      return this.rates.map((rate) => ({
        id: rate.id,
        from: rate.base.isoCode,
        to: rate.target.isoCode,
        ratio: rate.ratio,
      }));
    },
  },
};
</script>

<style lang="scss" scoped></style>