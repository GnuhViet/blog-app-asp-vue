<template>
    <div class="justify-content-center">
        <!-- Display student list -->
        <h1>Show User</h1>
        <div class="row">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>Bài viết</th>
                                <th>Bình luận</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="u in Users" :key="u.blogUserId">
                                <td>{{ u.username }}</td>
                                <td>{{ u.email }}</td>
                                <td>{{ u.fullName }}</td>
                                <td>
                                    <router-link :to="{name: 'ListArticle', params: {id: u.blogUserId }}"
                                    class="btn btn-success me-2">
                                        Danh sách
                                    </router-link>
                                </td>
                                <td>
                                    <router-link :to="{name: 'ListComment', params: {id: u.blogUserId}}"
                                    class="btn btn-success me-2">
                                        Danh sách
                                    </router-link>
                                </td>
                                <td>
                                    <button @click.prevent="setAdmin(u.blogUserId)"
                                    class="btn btn-danger">
                                        Set admin
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            Users: []
        }
    },
    created() {
        const headers = {
            'Authorization': 'Bearer ' + sessionStorage.getItem("JWT"),
        }

        let apiURL = 'http://localhost:5000/api/Admin/User';
        axios.get(apiURL, {headers: headers}).then(res => {
            this.Users = res.data
        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
        setAdmin(id) {
            const authHeaders = {
                'Authorization': 'Bearer ' + sessionStorage.getItem("JWT"),
            }
            let apiURL = `http://localhost:5000/api/Account/SetAdmin/${id}`;

            console.log(apiURL);

            if (window.confirm("Do you really want to make this person admin?")) {
                axios({
                    method: 'put',
                    url: apiURL,
                    data: null,
                    headers:authHeaders
                }).then(() => {
                    window.alert("Da set admin!!")
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
}
</script>