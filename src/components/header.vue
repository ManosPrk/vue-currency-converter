<template>
  <header>
    <nav
      class="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link class="navbar-item" to="/currencies"
          >Currencies</router-link
        >
        <router-link class="navbar-item" to="/rates">Rates</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped></style>
