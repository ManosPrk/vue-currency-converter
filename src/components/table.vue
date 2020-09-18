<template>
  <div>
    <table class="table is-fullwidth" v-if="rows">
      <thead>
        <th :key="column" v-for="column in columns">{{ column }}</th>
      </thead>
      <tbody>
        <tr :key="row.id" v-for="row in rows">
          <td :key="element" v-for="element in row">{{ element }}</td>
          <td v-if="updateRow">
            <router-link
              class="button is-primary"
              :to="{ name: updateRow.link, params: { id: row.id } }"
            >{{ updateRow.title }}</router-link>
          </td>
          <td v-if="deleteRow">
            <button class="button is-danger" @click="deleteRow.onClick(row)">{{ deleteRow.title }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    rows: {
      type: Array,
      default: undefined,
    },
    columns: {
      type: Array,
      default: undefined,
    },
    updateRow: {
      type: Object,
      default: undefined,
    },
    deleteRow: {
      type: Object,
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>