<template>
    <div class="justify-content-center" >
        <!-- Display student list -->
        <h1>User's Comment</h1>
        <div class="row" id="content">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead class="table-dark">
                            <tr>
                              <th>Content</th>
                              <th>Date Created</th>
                              <th>Article Id</th>
                              <th>Action</th>
                            </tr>
                        </thead>
                        <tbody> 
                            <tr v-for="tableData in tableData" :key="tableData.createByBlogUserId">
                              <td>{{ tableData.content }}</td>
                              <td>{{ tableData.createDate }}</td>
                              <td>{{ tableData.articleId }}</td>
                              <td>
                                    <button  @click.prevent="DeleteArticle(tableData.id)"
                                       class="btn btn-danger">
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
          <ul>
            <li v-if="currentPage > 1">
              <a class="pgn__prev" href="#0" @click="prevPage">Prev</a>
            </li>
            <li v-for="pageNumber in pages" :key="pageNumber">
              <a v-if="pageNumber === currentPage" class="pgn__num current"> {{ pageNumber }}</a>
              <a v-else class="pgn__num" href="#0" @click="changePage(pageNumber)">{{ pageNumber }}</a>
            </li>
            <li v-if="currentPage < totalPages">
              <a class="pgn__next" href="#0" @click="nextPage">Next</a>
            </li>
          </ul>
        </nav>
      </div>
      </div>
    
    </div>
  </template>
    
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        tableData: [],
        pageSize: 9,
        currentPage: 1,
        totalPages: 0,
        Id :this.$route.params.id,
        
  
      };
    },
    created() {
      this.testApi();
    },
    
    methods: {
      testApi() {
        var token = sessionStorage.getItem("JWT");
        const headers = {
          'Authorization': "Bearer " + token,
        };
       
        axios.get(`http://localhost:5000/api/Admin/User/${this.Id}/Comments?PageNumber=${this.currentPage}`, { headers: headers })
          .then((res) => {
            console.log(res.data.data);
            let resc = res.data.data;
            this.tableData = resc;
            const firstItem = resc[0];
            if (firstItem) {
            this.Id = firstItem.createByBlogUserId;
            console.log(this.Id);
            }
            this.totalPages = Math.ceil(this.tableData.length / this.pageSize);
            console.log(this.currentPage);
            console.log(this.totalPages);
          })
          .catch((error) => {
            console.log(error);
          });
      },
  
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;    
          this.Reload();
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.Reload();
        }
      },
      changePage(pageNumber) {
        this.currentPage = pageNumber;
        console.log(this.currentPage);
        this.Reload();
      },
      Reload(){
        var token = sessionStorage.getItem("JWT");
        const headers = {
          'Authorization': "Bearer " + token,
        };
  
        axios.get(`http://localhost:5000/api/Admin/User/${this.Id}/Comments?PageNumber=${this.currentPage}`, { headers: headers })
          .then((res) => {
            let resc = res.data.data;
            this.tableData = resc;
          })
          .catch((error) => {
            console.log(error);
          });
       },
       DeleteArticle(idComment){
        var token = sessionStorage.getItem("JWT");
        const headers = {
          'Authorization': "Bearer " + token,
        };
         if (window.confirm("Do you really want to delete?")) {
          axios.delete(`http://localhost:5000/api/Admin/User/${this.Id}/Comments/${idComment}`, { headers: headers })
          .then((res) => {
            this.Reload();
            console(res);
          })
          .catch((error) => {
            console.log(error);
          });
          
          }
       }
    },
    
    computed: {
      paginatedData() {
        let startIndex = (this.currentPage - 1) * this.pageSize;
        let endIndex = this.currentPage * this.pageSize;
        return this.tableData.slice(startIndex, endIndex);
      },
      pages() {
        let pagesArray = [];
        for (let i = 1; i <= this.totalPages; i++) {
          pagesArray.push(i);
        }
        return pagesArray;
      },
       
    },
  };
  </script>
  <style>
  .pgn {
    margin: 20px 0;
    display: flex;
    justify-content: center;
  }
  
  .pgn ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .pgn li {
    margin: 0;
    padding: 0;
  }
  
  .pgn a {
    display: block;
    margin-right: 5px;
    padding: 5px 10px;
    border-radius: 3px;
    text-decoration: none;
    color: #333;
    background-color: #f1f1f1;
    transition: background-color 0.3s ease;
  }
  
  .pgn a:hover {
    background-color: #333;
    color: #fff;
  }
  
  .pgn .current {
    background-color: #333;
    color: #fff;
  }
  </style>