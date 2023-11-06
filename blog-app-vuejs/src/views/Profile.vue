<template>
  <body>
    <div v-if="!isEditing" class="profile">
      <img
        :src="
          table_data.avatar
            ? table_data.avatar
            : imagePreview
            ? imagePreview
            : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        "
        alt="User Avatar"
      />
      <h1>{{ table_data.username }}</h1>
      <table>
        <tr>
          <td>Full name:</td>
          <td>{{ table_data.fullName }}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{{ table_data.email }}</td>
        </tr>
        <tr>
          <td>Phone:</td>
          <td>{{ table_data.phoneNumber }}</td>
        </tr>
      </table>
      <button @click="isEditing = true">Edit</button>
    </div>
    <div v-else class="profile">
      <img
        id="editImage"
        :src="
          table_data.avatar
            ? table_data.avatar
            : imagePreview
            ? imagePreview
            : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        "
        alt="User Avatar"
        v-if="isEditing"
        onclick="document.getElementById('input-image').click()"
      />
      <form @submit.prevent="saveData">
        <input
          id="input-image"
          type="file"
          style="display: none"
          accept="image/*"
          @change="handleImageUpload"
        />
        <label class="username-label">Username:</label>
        <input class="username-input" type="text" v-model="table_data.username" readonly />
        <label>Full name:</label>
        <input type="text" v-model="table_data.fullName" />
        <label>Email:</label>
        <input type="email" v-model="table_data.email" />
        <label>Phone:</label>
        <input type="tel" v-model="table_data.phoneNumber" />
        <button type="submit">Save</button>
        <button type="button" @click="cancelEdit">Cancel</button>
      </form>
    </div>
  </body>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';
export default {
  components: {},
  data() {
    return {
      table_data: {},
      isEditing: false,
      imageFile: null,
      imagePreview: null,
    };
  },
  created() {
    this.testApi();
  },
  methods: {
    testApi() {
      var token = sessionStorage.getItem('JWT');

      const headers = {
        Authorization: 'Bearer ' + token,
      };

      axios
        .get('http://localhost:5000/api/Account/UserDetails', {
          headers: headers,
        })
        .then((res) => {
          let resc = res.data.user;
          this.blogUserId = resc.blogUserId;
          this.table_data = resc;
          console.log(this.table_data);
          if (this.table_data.avatar !== null) {
            this.table_data.avatar = 'http://localhost:5000' + this.table_data.avatar;
          }
          console.log(this.table_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.imageFile = file;
      this.toBase64(file).then((base64String) => {
        this.imagePreview = base64String;
        document.getElementById('editImage').src = base64String;
      });
    },
    saveData() {
      var token = sessionStorage.getItem('JWT');

      const headers = {
        Authorization: 'Bearer ' + token,
      };

      this.table_data.blogUserId = this.blogUserId;

      if (this.imageFile) {
        this.toBase64(this.imageFile).then((base64String) => {
          this.table_data.avatar = base64String;
          axios
            .put('http://localhost:5000/api/Account/UserDetails', this.table_data, {
              headers: headers,
            })
            .then((res) => {
              console.log(res);
              this.isEditing = false;
            })
            .catch((error) => {
              console.log(error);
            });
        });
      } else {
        axios
          .put('http://localhost:5000/api/Account/UserDetails', this.table_data, {
            headers: headers,
          })
          .then((res) => {
            console.log(res);
            this.isEditing = false;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.imagePreview = this.table_data.avatar ? this.table_data.avatar : null;
      this.table_data = {
        ...this.table_data,
        avatar: null, // or default image url
      };
    },
    async toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
  },
};
</script>

<style>
.profile {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.profile img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.profile h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.profile table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

.profile td {
  padding: 10px;
  border: 1px solid #ccc;
}

.profile form label {
  display: inline-block;
  width: 100px;
  text-align: left;
  margin-bottom: 10px;
}

.profile form input {
  display: inline-block;
  width: calc(100% - 110px);
  margin-bottom: 10px;
}

.username-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.username-input {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  font-size: 16px;
  background-color: #f9f9f9;
}
</style>
