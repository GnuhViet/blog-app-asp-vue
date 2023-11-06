<template>
  <form @submit.prevent="submit">
    <fieldset>
      <div class="form-field">
        <input v-model="data.username" class="full-width" placeholder="username" type="text" />
      </div>

      <div class="form-field">
        <input v-model="data.password" class="full-width" placeholder="password" type="password" />
      </div>

      <div class="form-field">
        <input v-model="data.email" class="full-width" placeholder="email" type="email" />
      </div>

      <div class="form-field">
        <input
          v-model="data.fullName"
          class="full-width"
          placeholder="Your Full Name"
          type="text"
        />
      </div>

      <input
        name="submit"
        id="submit"
        class="btn btn--primary btn-wide btn--large full-width"
        value="Register"
        type="submit"
      />
    </fieldset>
  </form>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Register',
  setup() {
    const data = reactive({
      username: '',
      email: '',
      password: '',
      fullName: '',
    });

    const headers = {
      'Content-Type': 'application/json',
    };

    const router = useRouter();
    const submit = async () => {
      const json = JSON.stringify(data);
      const res = await axios
        .post('http://localhost:5000/api/Account/SignUp', json, {
          headers: headers,
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
      await router.push('/login');
    };

    return {
      data,
      submit,
    };
  },
};
</script>

<style></style>
