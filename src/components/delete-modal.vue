<template>
  <div>
    <div class="modal is-active" v-if="itemToDelete">
      <div class="modal-background" @click="cancelDelete"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ modalTitle }}</p>
          <button @click="cancelDelete" class="delete"></button>
        </header>
        <section class="modal-card-body">
          <p>
            Are you sure that you want to delete item with ID
            {{ itemToDelete.id }} ?
          </p>
        </section>
        <footer class="modal-card-foot">
          <div class="field is-grouped">
            <button @click="cancelDelete" class="button">Cancel</button>
            <button @click="removeItem(itemToDelete.id)" class="button is-danger">Delete</button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteModal",
  props: {
    modalTitle: {
      type: String,
      default: "",
    },
    itemToDelete: {
      type: Object,
      default: undefined,
    },
    cancelDelete: {
      type: Function,
      default: function () {},
    },
    removeItem: {
      type: Function,
      default: function () {},
    },
  },
};
</script>

<style lang="scss" scoped>
</style>