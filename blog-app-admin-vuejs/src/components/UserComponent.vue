<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Content goes here -->
            <h1>Login</h1>
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label for="name">Username</label>
                    <input type="text" placeholder="Username" class="form-control" v-model="data.username">
                </div>
                <div class="form-group">
                    <label for="email">Password</label>
                    <input type="password" placeholder="Password" class="form-control" v-model="data.password">
                </div>
                <div class="form-group mt-3">
                    <button class="btn btn-success btn-block w-100" type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    /* eslint-disable */
    name: 'Login',
    setup(){
        const data = reactive({
            username:'',
            password:''
        });

        const headers = {
            'Content-Type': 'application/json',
        }

        const store = useStore();
        const router = useRouter();
        const vm = this;

        const submit = async() => {
            const json = JSON.stringify(data);
            const credentials = 'include';
            axios.post('http://localhost:5000/api/Account/SignIn', json, {
                headers: headers,
                credentails:credentials
            })
            .then((res) => {
                let resc = res.data;
                let authToken = resc.token;
                sessionStorage.setItem("JWT", authToken);
                console.log(res.status);
                if(res.status == 200){
                    alert("Login Success!!");
                    store.dispatch('setAuth', true);
                    router.push('/view');
                }
            })
            .catch(error => {
                console.log(error.response);
                let err = error.response;
                if(err.status == 401){
                    alert("User name or password is invalid");
                    store.dispatch('setAuth', false);
                }
            });
        };

        return{
            data,
            submit,
        }
    }
}
</script>