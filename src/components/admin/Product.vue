<template>
  <section class="section container">
    <h1 class="title is-2">
      Admin
    </h1>
    <h2 class="subtitle is-4">
      Products
    </h2>
    <a
      class="button is-primary"
      @click="addingProduct=true"
    >
      <FontAwesomeIcon icon="plus" />
    </a>

    <div
      v-if="addingProduct"
      class="box"
    >
      <form @submit.prevent="addProduct()">
        <div class="field">
          <button
            type="submit"
            class="button is-success"
          >
            Save
          </button>
        </div>
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input
              v-model="newProduct.name"
              type="text"
              class="input"
            >
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <input
              v-model="newProduct.description"
              type="text"
              class="input"
            >
          </div>
        </div>
        <div class="field">
          <label class="label">Image</label>
          <div class="control">
            <input
              v-model="newProduct.image"
              type="text"
              class="input"
            >
          </div>
        </div>
      </form>
    </div>
    <div
      v-for="(product, index) in products"
      :key="product.id"
      class="box"
    >
      <h2 class="title is-5">
        {{ product.data.name }}
        <span class="is-pulled-right">
          <a
            class="button is-primary"
            @click="editProduct(index)"
          >
            <FontAwesomeIcon icon="edit" />
          </a>
          <a
            class="button is-danger"
            @click="deleteProduct(index)"
          >
            <FontAwesomeIcon icon="times" />
          </a>
        </span>
      </h2>

      <form
        v-if="product.editing"
        @submit.prevent="saveProduct(index)"
      >
        <div class="field">
          <button
            type="submit"
            class="button is-success"
          >
            Save
          </button>
        </div>
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input
              v-model="product.data.name"
              type="text"
              class="input"
            >
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <input
              v-model="product.data.description"
              type="text"
              class="input"
            >
          </div>
        </div>
        <div class="field">
          <label class="label">Image</label>
          <div class="control">
            <input
              v-model="product.data.image"
              type="text"
              class="input"
            >
          </div>
        </div>
      </form>

      <form
        v-if="product.editing"
        @submit.prevent="addSize(index)"
      >
        <table class="table is-narrow">
          <caption class="title is-5">
            Sizes
          </caption>
          <thead>
            <tr>
              <th>Weight</th>
              <th>Name</th>
              <th>Price</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(size, sizeIndex) in product.data.sizes"
              :key="sizeIndex"
            >
              <td>
                <input
                  v-model="size.weight"
                  type="text"
                  class="input"
                >
              </td>
              <td>
                <input
                  v-model="size.name"
                  type="text"
                  class="input"
                >
              </td>
              <td>
                <input
                  v-model="size.price"
                  type="text"
                  class="input"
                >
              </td>
              <td>
                <a
                  class="button is-danger"
                  @click="deleteSize(index, sizeIndex)"
                >
                  <FontAwesomeIcon icon="times" />
                </a>
              </td>
            </tr>

            <tr>
              <td>
                <input
                  v-model="newSize.weight"
                  type="text"
                  class="input"
                >
              </td>
              <td>
                <input
                  v-model="newSize.name"
                  type="text"
                  class="input"
                >
              </td>
              <td>
                <input
                  v-model="newSize.price"
                  type="text"
                  class="input"
                >
              </td>
              <td>
                <button
                  type="submit"
                  class="button is-success"
                >
                  <FontAwesomeIcon icon="plus" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </section>
</template>

<script>
import db from '@/library/Database';

export default {
  name: "Product",
  data() {
    return {
      products: [],
      addingProduct: false,
      newProduct: {
        name: '',
        description: '',
        image: '',
        sizes: []
      },
      newSize: {
        weight: '',
        name: '',
        price: ''
      }
    };
  },
  created() {
    db.getProducts()
      .then((products) => {
        products.forEach((product) => {
          this.products.push({
            id: product.id,
            editing: false,
            data: product.data()
          })
        })
      });
  },
  methods: {
    addProduct() {
      db.addProduct(this.newProduct)
        .then((product) => {
          this.products.unshift({
            id: product.id,
            data: this.newProduct
          });

          this.addingProduct = false;
          this.newProduct = {
            name: '',
            description: '',
            image: '',
            sizes: []
          }

          this.editProduct(0);
        })
    },
    editProduct(index) {
      this.products.forEach(p => {
        p.editing = false;
      });
      this.products[index].editing = true;
    },
    saveProduct(index) {
      db.saveProduct(this.products[index].id, this.products[index].data)
        .then(() => {
          this.products[index].editing = false;
        });
    },
    deleteProduct(index) {
      db.deleteProduct(this.products[index].id)
        .then(() => {
          this.products.splice(index, 1);
        });
    },
    deleteSize(index, sizeIndex) {
      this.products[index].data.sizes.splice(sizeIndex, 1);
    },
    addSize(index) {
      this.products[index].data.sizes.push(this.newSize);
      this.newSize = {
        weight: '',
        name: '',
        price: ''
      };
    }
  }
}
</script>

<style scoped>

</style>
