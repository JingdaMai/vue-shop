import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'firebase/auth';
import { FirebaseApp } from "./library/Database";

import { ValidationProvider, ValidationObserver } from 'vee-validate';


import 'bulma/css/bulma.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.filter('price', price => Intl.NumberFormat('en-IN', { style: 'currency', currency: 'JPY' }).format(price))

let baseApp;


FirebaseApp.auth().onAuthStateChanged(() => {
  if (!baseApp) {
    baseApp = new Vue({
      router,
      store,
      created() {
        this.$store.dispatch('getProducts')
      },
      render: h => h(App),
    }).$mount('#app')
  }
})

