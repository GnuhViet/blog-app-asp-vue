<template>
  <form @submit.prevent="submit">
    <fieldset>
      <div class="form-field">
        <input v-model="data.username" class="full-width" placeholder="username" type="text" />
      </div>

      <div class="form-field">
        <input v-model="data.password" class="full-width" placeholder="password" type="password" />
      </div>

      <input
        name="submit"
        id="submit"
        class="btn btn--primary btn-wide btn--large full-width"
        value="Login"
        type="submit"
      />
    </fieldset>
  </form>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { mapMutations } from 'vuex';
export default {
  name: 'Login',
  setup() {
    const data = reactive({
      username: '',
      password: '',
    });

    const headers = {
      'Content-Type': 'application/json',
    };

    const store = useStore();
    const router = useRouter();
    const vm = this;

    const submit = async () => {
      const json = JSON.stringify(data);
      const credentials = 'include';
      await axios
        .post('http://localhost:5000/api/Account/SignIn', json, {
          headers: headers,
          credentails: credentials,
        })
        .then((res) => {
          let resc = res.data;
          let authToken = resc.token;
          sessionStorage.setItem('JWT', authToken);
          // document.cookie = `token=${authToken}`;
          // console.log(authToken);
          if (res.status == 200) {
            //Chuyển sang trang home
            alert('Login Success!!');
            store.dispatch('setAuth', true);
            router.push('/');
          }
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response);
          let err = error.response;
          if (err.status == 401) {
            alert('User name or password is invalid');
            store.dispatch('setAuth', false);
          }
        });
    };

    return {
      data,
      submit,
    };
  },
};
</script>

<style></style>
