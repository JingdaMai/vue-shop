<template>
  <div id="app">
    <nav class="navbar" role="navigation">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">
            Jingda Mai's Shop
          </router-link>
        </div>

        <div class="navbar-menu">
          <div class="navbar-end">
            <router-link to="/cart" class="navbar-item">
              <FontAwesomeIcon icon="shopping-cart"/>
              Cart {{ total | price }}
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    total() {
      return this.$store.getters.totalItems;
    }
  }
}
</script>
