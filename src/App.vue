<template>
  <div id="app">
    <Header />
    <section class="hero">
      <div class="hero-body">
        <div id="main-content" class="container py-5 px-5 has-background-light">
          <router-view />
        </div>
      </div>
    </section>
    <notifications />
  </div>
</template>

<script>
import Header from "../src/components/header";
export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import "@/design/bulma.scss";
#app {
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: grid;
  grid-template: auto 1fr auto / auto 1fr auto;
}

header{
  grid-column: 1/4;
}

section {
  grid-column: 1/4;
}

.modal-background{
  opacity: 0.4;
}
</style>
