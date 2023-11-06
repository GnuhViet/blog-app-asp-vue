<template>
  <div>
      <!-- Nav bar  -->
      <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
        <div class="container">
          <router-link to="/" class="navbar-brand float-left">Blog - Admin</router-link>
          <ul class="nav navbar-nav flex-row float-right">
            <li class="nav-item" v-if="!auth">
              <router-link to="/" class="nav-link px-3">Login</router-link>
            </li>
            <li class="nav-item" v-if="auth">
              <router-link to="/" class="nav-link" @click="logout">Logout</router-link>
            </li>
          </ul>
        </div>
      </nav>
      
    <!-- Router view -->
    <div class="container mt-5">
      <router-view>
        
      </router-view>
    </div>
  </div>

</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
/* eslint-disable */
export default {
  setup() {
    const store = useStore();
    const auth = computed(() => store.state.authenticated);
    const logout = async () => {
        sessionStorage.removeItem("JWT");
        store.dispatch('setAuth', false);
    }
    return{
        auth,
        logout
    }
  }
}
</script>