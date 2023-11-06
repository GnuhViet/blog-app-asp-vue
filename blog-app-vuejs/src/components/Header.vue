<template>
  <!-- site header
    ================================================== -->
  <header class="s-header">
    <!-- icon -->
    <div class="header__top">
      <div class="header__logo">
        <router-link to="/" class="site-logo"
          ><img src="images/logo.svg" alt="Homepage"
        /></router-link>
      </div>

      <div class="header__search">
        <form role="search" method="get" class="header__search-form" action="#">
          <label>
            <span class="hide-content">Search for:</span>
            <input
              type="search"
              class="header__search-field"
              v-model="title"
              name="s"
              title="Search for:"
              autocomplete="off"
            />
          </label>
          <input type="submit" class="header__search-submit" value="Search" />
        </form>
        <a v-on:click="search" href="#0" title="Close Search" class="header__search-close">Close</a>
      </div>
      <!-- end header__search -->

      <!-- toggles -->
      <a href="#0" class="header__search-trigger"></a>
      <a href="#0" class="header__menu-toggle"><span>Menu</span></a>
    </div>
    <!-- end header__top -->

    <nav class="header__nav-wrap">
      <ul class="header__nav">
        <li class="current">
          <a v-on:click="reloadPage"><router-link to="/">Home</router-link></a>
        </li>

        <li class="has-children">
          <a href="#0" title="">Categories</a>
          <ul class="sub-menu">
            <li v-for="category in categories" :key="category.id">
              <a v-on:click="searchByCategory(category.id)" href="#">
                <router-link :to="'/category/' + category.code">{{ category.name }}</router-link>
              </a>
            </li>
          </ul>
        </li>

        <li v-if="!auth"><router-link to="/login">Login</router-link></li>
        <li v-if="!auth"><router-link to="/register">Register</router-link></li>

        <li :style="{ visibility: visibility }" id="manage" class="has-children">
          <a href="#0" title="">Manage</a>
          <ul class="sub-menu">
            <li><router-link to="/create">Create Post</router-link></li>
            <li><router-link to="/manage">Manage</router-link></li>
          </ul>
        </li>

        <li v-if="auth"><router-link to="/profile">Profile</router-link></li>
        <li v-if="auth">
          <router-link to="/" @click="logout">Logout</router-link>
        </li>
      </ul>
      <!-- end header__nav -->

      <ul class="header__social">
        <li class="ss-facebook">
          <a href="https://facebook.com/">
            <span class="screen-reader-text">Facebook</span>
          </a>
        </li>
        <li class="ss-twitter">
          <a href="#0">
            <span class="screen-reader-text">Twitter</span>
          </a>
        </li>
        <li class="ss-dribbble">
          <a href="#0">
            <span class="screen-reader-text">Dribbble</span>
          </a>
        </li>
        <li class="ss-pinterest">
          <a href="#0">
            <span class="screen-reader-text">Behance</span>
          </a>
        </li>
      </ul>
    </nav>
    <!-- end header__nav-wrap -->
  </header>
  <!-- end s-header -->
</template>

<script>
import axios from 'axios';
import { computed } from 'vue';
import { mapActions, useStore } from 'vuex';
import store from '@/store';
export default {
  name: 'Header',
  data() {
    return {
      categories: [],
      table_data: [],
      title: '',
      selectedCategory: '',
    };
  },
  created() {
    axios
      .get('http://localhost:5000/api/Category')
      .then((response) => {
        this.categories = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {
    let recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute('src', './js/main.js');
    document.head.appendChild(recaptchaScript);
  },
  methods: {
    search() {
      if (this.title.trim() != '') {
        store.commit('setTableData', this.title);
      } else {
        store.commit('setTableData', '');
      }
    },
    searchByCategory(category) {
      this.selectedCategory = category;
      store.commit('setCategoryId', this.selectedCategory);
    },
    reloadPage() {
      location.reload();
    },
    ...mapActions({
      setTableData: 'setTableData',
      setCategoryId: 'setCategoryId',
    }),
  },
  setup() {
    const store = useStore();
    const auth = computed(() => store.state.authenticated);
    const logout = async () => {
      sessionStorage.removeItem('JWT');
      store.dispatch('setAuth', false);
    };
    return {
      auth,
      logout,
    };
  },
  computed: {
    visibility() {
      return this.auth ? 'visible' : 'hidden';
    },
  },
};
</script>

<style>
input[type='search' i] {
  padding: 0px;
}

input#search {
  width: 300px;
  height: 27px;
  margin-bottom: 0px;
  font-size: 1rem;
  color: #262626;
  border: none;
  padding: 5px;
  background-color: white !important;

  -webkit-transition: width 0.55s ease;
  -moz-transition: width 0.55s ease;
  -ms-transition: width 0.55s ease;
  -o-transition: width 0.55s ease;
  transition: width 0.55s ease;
}

input#search:focus,
.kt-header__topbar-item:hover input#search {
  outline: none;
  width: 300px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #93a2ad;
}

.result-search-box {
  display: none;
  width: 300px;
  padding: 0px 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.kt-header__topbar-item:focus-within .result-search-box {
  display: block;
}
.result-search-box:active {
  display: block;
}
#fast-search .kt-quick-search__result .kt-quick-search__section {
  margin-bottom: 0px;
}
#fast-search .kt-quick-search__result .kt-quick-search__item .kt-quick-search__item-icon {
  background-color: #f8f9fa;
}
</style>
