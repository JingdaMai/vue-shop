<template>
  <section class="section container">
    <div class="tabs is-fullwidth">
      <ul>
        <li :class="{'is-active': step === 1}"><a>1. Information</a></li>
        <li :class="{'is-active': step === 2}"><a>2. Payment &amp; Shipping</a></li>
        <li :class="{'is-active': step === 3}"><a>3. Confirmation</a></li>
      </ul>
    </div>

    <div class="columns">
      <div class="column is-8 is-offset-2">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(nextStep)" v-if="step === 1">
            <h1 class="title">
              Your Information
            </h1>

            <div class="filed">
              <label class="label">Name</label>
              <div class="control">
                <ValidationProvider vid="name" name="name" rules="required" v-slot="{ errors }">
                  <input v-model="customer.name" class="input" type="text" placeholder="Your name" />
                  <p class="help is-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>

            <div class="filed">
              <label class="label">Address</label>
              <div class="control">
                <ValidationProvider vid="address" name="address" rules="required" v-slot="{ errors }">
                  <input v-model="customer.address" class="input" type="text" placeholder="Home address" />
                  <p class="help is-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>

            <div class="field">
              <label class="label">Country</label>
              <CountrySelect @select="updateCountry" :selected-country="customer.country"/>
            </div>

            <div class="filed">
              <label class="label">City</label>
              <div class="control">
                <ValidationProvider vid="city" name="city" rules="required" v-slot="{ errors }">
                  <input v-model="customer.city" class="input" type="text" placeholder="City" />
                  <p class="help is-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>

            <div class="filed">
              <label class="label">Postcode</label>
              <div class="control">
                <ValidationProvider vid="postcode" name="postcode" rules="required" v-slot="{ errors }">
                  <input v-model="customer.postcode" class="input" type="text" placeholder="Postcode" />
                  <p class="help is-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>

            <div class="filed">
              <label class="label">Email Address</label>
              <div class="control">
                <ValidationProvider vid="email" name="email" rules="required|email" v-slot="{ errors }">
                  <input v-model="customer.email" class="input" type="email" placeholder="your@email.address" />
                  <p class="help is-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>

            <div class="filed is-grouped">
              <div class="control">
                <button class="button is-link" type="submit">
                  Continue to shipping &amp; payment
                </button>
              </div>
            </div>
          </form>

          <form @submit.prevent="handleSubmit(nextStep)" v-if="step === 2" class="columns is-multiline">
            <div class="column is-one-third">
              <div class="box">
                <h2 class="title is-4">Shipping</h2>
                <div class="control">
                  <p v-for="(shippingOption, index) in shippingOptions" :key="index">
                    <ValidationProvider vid="shipping" name="shipping" rules="required|excluded:-1" v-slot="{ errors }">
                      <label class="radio">
                        <input v-model="shipping" type="radio" :value="index">
                        {{ shippingOption.name }} (+{{ shippingOption.price }} JPY)
                      </label>
                      <span>{{ errors[0]}}</span>
                    </ValidationProvider>
                  </p>
                </div>
              </div>
            </div>

            <div class="column is-one-third">
              <div class="box">
                <h2 class="title is-4">Payment</h2>
                <div class="control">
                  <p v-for="(paymentOption, index) in paymentOptions" :key="index">
                    <ValidationProvider vid="payment" name="payment" rules="required|excluded:-1'" v-slot="{ errors }">
                      <label class="radio">
                        <input v-model="payment" type="radio" :value="index">
                        {{ paymentOption.name }}
                      </label>
                      <span>{{ errors[0]}}</span>
                    </ValidationProvider>
                  </p>
                </div>
              </div>
            </div>

            <div class="column is-one-third">
              <div class="box">
                <h2 class="title is-4">
                  Total
                </h2>
                <p>
                  Cart: {{ totalItems | price }}
                </p>
                <p>Incl. shipping and payment: {{ total | price }}</p>
              </div>
            </div>

            <div class="field is-grouped column is-12">
              <div class="control">
                <button type="submit" class="button is-link">
                  Continue to confirmation
                </button>
              </div>
            </div>

          </form>

          <form @submit.prevent="handleSubmit(checkout)" v-if="step === 3" class="column is-multiline">
            <Cart view-only />
            <div class="column is-one-third">
              <h2 class="title is-5">Shipping</h2>
              <p>{{ selectedShipping.name }}</p>
              <p>{{ selectedShipping.price | price }}</p>
            </div>

            <div class="column is-one-third">
              <h2 class="title is-5">Payment</h2>
              <p>{{ selectedPayment.name }}</p>
              <p>{{ selectedPayment.price | price }}</p>
            </div>

            <div class="column is-one-third">
              <h2 class="title is-4">Total {{ total | price }}</h2>
            </div>

            <div class="filed is-grouped">
              <div class="control">
                <button type="submit" class="button is-link">
                  Confirm order
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>


        <div v-if="step === 4">
          <h1 class="title">Thank you for your order!</h1>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import CountrySelect from './CountrySelect';
import Cart from './Cart';

export default {
  name: "Checkout",
  components: {
    CountrySelect,
    Cart
  },
  data() {
    return {
      step: 1,
      customer: this.$store.state.customer,
      shippingOptions: [
        {
          name: 'Postal Service',
          price: 10
        },
        {
          name: 'Pickup',
          price: 0
        }
      ],
      paymentOptions: [
        {
          name: 'Cash on delivery',
          price: 0
        }
      ]
    };
  },
  computed: {
    total() {
      return this.$store.getters.total;
    },
    totalItems() {
      return this.$store.getters.totalItems;
    },
    shipping: {
      get() {
        return this.shippingOptions.findIndex(s => s.name === this.$store.state.shipping.name);
      },
      set(value) {
        this.$store.commit('SET_SHIPPING', this.shippingOptions[value]);
      }
    },
    selectedShipping() {
      return this.shippingOptions[this.shipping];
    },
    payment: {
      get() {
        return this.paymentOptions.findIndex(s => s.name === this.$store.state.payment.name);
      },
      set(value) {
        this.$store.commit('SET_PAYMENT', this.paymentOptions[value]);
      }
    },
    selectedPayment() {
      return this.paymentOptions[this.payment];
    }
  },
  watch: {
    customer: {
      handler(customer) {
        this.$store.commit('SET_CUSTOMER', customer);
      },
      deep: true
    }
  },
  methods: {
    updateCountry(country) {
      this.$set(this.customer, 'country', country);
    },
    nextStep() {
      this.step += 1;
    },
    checkout() {
      this.$store.dispatch('addOrder')
        .then(() => this.step = 4)
        .catch(console.log);
    }
  }
}
</script>

<style scoped>

</style>
