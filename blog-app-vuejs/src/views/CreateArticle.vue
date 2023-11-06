<template>
  <h3 class="h2">Post New Article</h3>

  <form name="contactForm" id="contactForm" method="post" action="" autocomplete="off">
    <fieldset>
      <div class="form-field">
        <div class="categories-container">
          <div v-for="category in categories" :key="category.id" class="category">
            <label :for="'category-' + category.id">
              <input
                type="checkbox"
                :id="'category-' + category.id"
                :value="category.id"
                v-model="inputData.categoryIds"
              />
              {{ category.name }}
            </label>
          </div>
        </div>
      </div>

            <div class="form-field">
                <input name="cTitle" id="cTitle" class="full-width" placeholder="Title" type="text"
                    v-model="inputData.title">
            </div>

      <div class="form-field">
        <input
          name="cThumbnail"
          id="cThumbnail"
          class="full-width"
          placeholder="Thumbnail"
          type="text"
          v-model="inputData.thumbnail"
        />
      </div>

      <div class="form-field">
        <input
          name="cDescription"
          id="cDescription"
          class="full-width"
          placeholder="Description"
          type="text"
          v-model="inputData.shortDescription"
        />
      </div>

            <editor v-model="inputData.content" api-key="dbg7svsu8ovrt7sgcc1su1vw1rdya8ygm0ll3im2av4185gi" :init="{
                height,
                menubar,
                plugins: [
                    'advlist',
                    'autolink',
                    'link',
                    'image',
                    'lists',
                    'charmap',
                    'preview',
                    'anchor',
                    'pagebreak',
                    'searchreplace',
                    'wordcount',
                    'visualblocks',
                    'visualchars',
                    'code',
                    'insertdatetime',
                    'media',
                    'table',
                    'emoticons',
                    'fullscreen',
                ],
                toolbar:
                    'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image preview emoticons | fullscreen',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }" />

      <input
        @click.prevent="submitForm()"
        name="submit"
        id="submit"
        class="btn btn--primary btn-wide btn--large full-width"
        value="Create Post"
        type="submit"
      />
    </fieldset>
  </form>
  <!-- end form -->
</template>

<script>
import axios from 'axios';
import Editor from '@tinymce/tinymce-vue';
import { useStore } from 'vuex';
export default {
    name: 'CreateArticle',
    components: {
        'editor': Editor,
    },
    data() {
        return {
            inputData: {
                id: 0,
                categoryIds: [],
                title: "",
                thumbnail: "",
                shortDescription: "",
                content: "",
            },
            categories: [],
            filterData: {

            }
        };
    },
    mounted() {
        const store = useStore();
        let jwt = sessionStorage.getItem("JWT");
        console.log(jwt);
        if (jwt != null) {
            store.dispatch('setAuth', true);
        };
        this.whenMounted();
    },
    methods: {
        whenMounted() {
            axios.get('http://localhost:5000/api/Category')
                .then(response => {
                    this.categories = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        submitForm() {
            var token = sessionStorage.getItem("JWT");
            const headers = {
                'Authorization': "Bearer " + token,
            }
            // Check if any input fields are empty or null
            if (this.inputData.categoryIds.length === 0 ||
                !this.inputData.title ||
                !this.inputData.thumbnail ||
                !this.inputData.shortDescription ||
                !this.inputData.content) {
                alert("Vui lòng điền đầy đủ các trường");
                return;
            }

            axios.post("http://localhost:5000/api/Article", this.inputData, {
                headers: headers,
            })
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        alert("Create Success!!");
                    }
                    location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>

<style>
.categories-container {
  display: flex;
  flex-wrap: wrap;
}

.category {
  flex-basis: 33.33%;
}
</style>
