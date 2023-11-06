<template>
  <div>
    <div v-if="loading">Loading articles...</div>
    <div v-else class="masonry-wrap">
      <div class="masonry">
        <div class="grid-sizer"></div>
        <article
          class="masonry__brick entry format-standard"
          v-for="(item, index) in articles"
          :key="index"
        >
          <div class="entry__thumb">
            <a href="single-standard.html" class="entry__thumb-link">
              <img :src="item.thumbnail" alt="" />
            </a>
          </div>
          <div class="entry__text">
            <div class="entry__header">
              <h2 class="entry__title">
                <router-link :to="'/details/' + item.id">{{ item.title }}</router-link>
              </h2>
              <div class="entry__meta">
                <span class="entry__meta-cat">
                  <a
                    v-for="category in item.categories"
                    :key="category.id"
                    :href="'category.html?id=' + category.id"
                    >{{ category.name }}</a
                  >
                </span>
                <span class="entry__meta-date">
                  <p>{{ item.formattedCreateDate }}</p>
                </span>
              </div>
            </div>
            <div class="entry__excerpt">
              <p>{{ item.shortDescription }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="column large-full">
      <nav class="pgn">
        <div v-if="totalPages > 1">
          <ul class="pagination">
            <li :class="{ disabled: !hasPreviousPage }">
              <a class="pgn__prev" href="#" @click.prevent="categoryFilter(this.category_id,pageNumber - 1)">
                <span>&laquo;</span>
              </a>
            </li>
            <li v-for="page in pages" :key="page" :class="{ active: page === pageNumber }">
              <a class="pgn__num" href="#" @click.prevent="categoryFilter(this.category_id,page)">{{ page }}</a>
            </li>
            <li :class="{ disabled: !hasNextPage }">
              <a class="pgn__next" href="#" @click.prevent="categoryFilter(this.category_id,pageNumber + 1)">
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
import { mapGetters, useStore } from 'vuex';
import router from '@/router';
// import Pagination from 'vue-pagination-2';
export default {
  name: 'Category',
  components: {
    // Pagination,
  },
  data() {
    return {
      table_data: [],
      category_id: '',
      pageNumber: 1,
      pageSize: 9,
      totalPages: 1,
      totalRecords: 0,
      nextPage: null,
      previousPage: null,
      articles: [],
      loading: true,
    };
  },
//   created() {
//     this.testApi(this.pageNumber);
//   },
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
    ...mapGetters({
      tableData: 'getTableData',
      categoryId: 'getCategoryId',
    }),
  },
  watch: {
    categoryId(newValue) {
      this.category_id = newValue;
      this.categoryFilter(this.category_id, this.pageNumber);
    },
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
    // this.categoryFilter(this.category_id,this.pageNumber);
  },

  methods: {
    categoryFilter(category_id, pageNumber){
        console.log(category_id);
      axios.get(`http://localhost:5000/api/Article/category/${category_id}?pageNumber=${pageNumber}&pageSize=${this.pageSize}`)
      .then((res) => {
        let table_data = res.data;
        this.pageNumber = table_data.pageNumber;
        this.totalPages = table_data.totalPages;
        this.totalRecords = table_data.totalRecords;
        this.nextPage = table_data.nextPage;
        this.previousPage = table_data.previousPage;
        this.articles = table_data.data;
        this.loading = false;
      });
    },
    setPage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style></style>
