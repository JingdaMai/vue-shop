import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import db from '../library/Database';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    products: {},
    items: [],
    customer: {},
    shipping: {},
    payment: {}
  },
  getters: {
    getProduct: state => id => state.products[id],
    totalItems: state => state.items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0),
    shippingPrice: (state) => state.shipping.price ? state.shipping.price : 0,
    paymentPrice: (state) => state.payment.price ? state.payment.price : 0,
    total: (_state, getters) => getters.totalItems + getters.shippingPrice + getters.paymentPrice
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    ADD_ITEM(state, {id, size, price, quantity}) {
      const itemIndex = state.items.findIndex(i => i.id === id && i.size === size);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity += quantity;
      } else {
        state.items.push({ id, size, price, quantity});
      }
    },
    SET_ITEM_QUANTITY(state, { id, size, quantity }) {
      const itemIndex = state.items.findIndex(i => i.id === id && i.size === size);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = quantity;
      }
    },
    REMOVE_ITEM (state, { id, size }) {
      const itemIndex = state.items.findIndex(i => i.id === id && i.size === size);
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
      }
    },
    SET_CUSTOMER(state, customer) {
      state.customer = customer;
    },
    SET_SHIPPING(state, shipping) {
      state.shipping= shipping;
    },
    SET_PAYMENT(state, payment) {
      state.payment= payment;
    },
    CLEAR_CART(state) {
      state.items = [];
      state.shipping = {};
      state.payment = {};
    }
  },
  actions: {
    getProducts({ commit }) {
      db.getProducts().then(products => {
        const tempProducts = {};

        products.forEach(product => {
          tempProducts[product.id] = product.data();
        })

        commit('SET_PRODUCTS', tempProducts);
      })
    },
    addOrder({ commit, state }) {
      db.addOrder({
        cart: state.items,
        customer: state.customer,
        shipping: state.shipping,
        payment: state.payment
      })
        .then(() => {
          commit('CLEAR_CART');
        })
        .catch(console.log)
    }
  }
})
