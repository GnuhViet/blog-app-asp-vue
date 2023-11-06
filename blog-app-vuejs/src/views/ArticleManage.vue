<template>
  <div class="row add-bottom">
    <div class="column large-full">
      <h3>Your Post</h3>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Created Date</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in articles" :key="item.id">
              <td>{{ item.title }}</td>
              <td>{{ item.formattedCreateDate }}</td>
              <td>{{ item.shortDescription }}</td>
              <td>
                <router-link :to="'/edit/' + item.id">
                  <button @click="transferItemId(item.id)" class="btn">Edit</button>
                </router-link>
                <button v-on:click="deleteItem(item.id)" class="btn btn--primary">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="column large-full">
      <nav class="pgn">
        <div v-if="totalPages > 1">
          <ul class="pagination">
            <li :class="{ disabled: !hasPreviousPage }">
              <a class="pgn__prev" href="#" @click.prevent="testApi(pageNumber - 1)">
                <span>&laquo;</span>
              </a>
            </li>
            <li v-for="page in pages" :key="page" :class="{ active: page === pageNumber }">
              <a class="pgn__num" href="#" @click.prevent="testApi(page)">{{
                page
              }}</a>
            </li>
            <li :class="{ disabled: !hasNextPage }">
              <a class="pgn__next" href="#" @click.prevent="testApi(pageNumber + 1)">
                <span>&raquo;</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, useStore } from 'vuex';
import store from '@/store';
export default {
  name: 'Manage',
  data() {
    return {
      table_data: [],
      pageNumber: 1,
      pageSize: 4,
      totalPages: 1,
      totalRecords: 0,
      nextPage: null,
      previousPage: null,
      articles: [],
      loading: true,
    };
  },
  created() {
    this.testApi();
  },
  computed: {
    hasPreviousPage() {
      return this.previousPage !== null;
    },
    hasNextPage() {
      return this.nextPage !== null;
    },
    pages() {
      const pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  created() {
    this.testApi(this.pageNumber);
  },
  mounted() {
    const store = useStore();
    let jwt = sessionStorage.getItem('JWT');
    if (jwt != null) {
      store.dispatch('setAuth', true);
    } else {
      //nếu chưa đăng nhập thì trả về trang login
      store.dispatch('setAuth', false);
    }
    // Load trang đầu tiên khi component được render
    this.testApi(this.pageNumber);
  },
  methods: {
    testApi(pageNumber) {
      var token = sessionStorage.getItem('JWT');

      const headers = {
        Authorization: 'Bearer ' + token,
      };

      axios
        .get(
          `http://localhost:5000/api/Article/manage?pageNumber=${pageNumber}&pageSize=${this.pageSize}`,
          {
            headers: headers,
          },
        )
        .then((res) => {
          let table_data = res.data;
          this.pageNumber = table_data.pageNumber;
          this.totalPages = table_data.totalPages;
          this.totalRecords = table_data.totalRecords;
          this.nextPage = table_data.nextPage;
          this.previousPage = table_data.previousPage;
          this.articles = table_data.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    transferItemId(item) {
      console.log(item);
      store.commit("setIdArticle", item);
    },
    deleteItem(item) {
      var token = sessionStorage.getItem('JWT');

      const headers = {
        Authorization: 'Bearer ' + token,
      };
      axios
        .delete(`http://localhost:5000/api/Article/${item}`, {
          headers: headers,
        })
        .then((res) => {
          if (res.status == 200) {
            // Nếu dữ liệu bị xóa là dữ liệu cuối cùng của trang, trở lại trang trước đó
            if (this.articles.length === 1 && this.pageNumber > 1) {
              this.testApi(this.pageNumber - 1);
            } else {
              // Nếu không, load lại trang hiện tại
              this.testApi(this.pageNumber);
            }
          }
        });
    },
    ...mapActions({
      setIdArticle: 'setIdArticle',
    }),
    setPage(page) {
      this.currentPage = page;
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    nextPage() {
      this.currentPage++;
    },
    prevPage() {
      this.currentPage--;
    },
  },
};
</script>
