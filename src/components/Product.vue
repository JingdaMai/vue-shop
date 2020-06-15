<template>
  <section class="section container">
    <div class="columns box">
      <div class="column is-8">
        <img
          :src="product.image"
          :alt="product.name"
        >
        <p>{{ product.description }}</p>
      </div>
    </div>

    <div class="column is-4">
      <h1 class="title">
        {{ product.name }}
      </h1>
      <form @submit.prevent="addToCart">
        <table class="table is-borderless is-hoverable is-compact">
          <thead>
            <tr>
              <th />
              <th>Size</th>
              <th>Weight</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(size, i) in product.sizes"
              :key="i"
            >
              <td>
                <input
                  v-model="pickedSize"
                  type="radio"
                  name="size"
                  :value="i"
                >
              </td>
              <td>{{ size.name }}</td>
              <td>{{ size.weight }}</td>
              <td>{{ size.price }}</td>
            </tr>
          </tbody>
        </table>

        <div class="filed">
          <label>Quantity</label>
          <input
            v-model="quantity"
            type="number"
          >
        </div>

        <div class="filed">
          <label>Total</label>
          <p>{{ total | price }} </p>
        </div>

        <button type="submit" class="button is-success">
          <FontAwesomeIcon icon="cart-plus"/> Add to cart
        </button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "Product",
  data() {
    return {
      pickedSize: 0,
      quantity: 1
    };
  },
  computed: {
    product() {
      return this.$store.getters.getProduct(this.$route.params.id);
    },
    total() {
      if (!this.product.sizes || !this.product.sizes[this.pickedSize]) {
        return 0;
      }
      return this.product.sizes[this.pickedSize].price * this.quantity;
    }
  },
  methods: {
    addToCart() {
      this.$store.commit('ADD_ITEM', {
        id: this.$route.params.id,
        size: this.pickedSize,
        quantity: this.quantity,
        price: this.product.sizes[this.pickedSize].price
      })
    }
  }
}
</script>

<style scoped>
img {
  margin: -32px;
  margin-bottom: 1.5em;
}

p {
  font-size: 1.1em;
}
</style>
