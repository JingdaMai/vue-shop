<template>
  <form
    class="container"
    @submit.prevent="login"
  >
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          v-model="email"
          class="input"
          type="email"
        >
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input
          v-model="password"
          class="input"
          type="password"
        >
      </div>
    </div>
    
    <p v-if="error">
      {{ error }}
    </p>
    <div class="control">
      <button
        class="button is-primary"
        type="submit"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import 'firebase/auth';
import { FirebaseApp } from "@/library/Database";

const auth = FirebaseApp.auth();

export default {
  name: "Login",
  data() {
    return {
      error: null,
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      auth.signInWithEmailAndPassword(this.email, this.password)
        .catch((error) => {
          this.error = error.message;
        });

      auth.onAuthStateChanged((user) => {
        if (user) {
          this.$router.push('/admin/products');
        }
      });
    }
  }
}
</script>

<style scoped>

</style>