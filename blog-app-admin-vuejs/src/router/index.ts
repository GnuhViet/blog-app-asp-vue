import { createWebHistory, createRouter } from "vue-router";
import ListUserComponent from "@/components/ListUserComponent.vue";
import UserComponent from "@/components/UserComponent.vue";
import ListArticle from "@/components/ListArticle.vue";

import ListCommentComponent from "@/components/ListCommentComponent.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: UserComponent,
  },
  {
    path: "/view",
    name: "view",
    component: ListUserComponent,
  },
  {
    path: "/ListArticle",
    name: "ListArticle",
    component: ListArticle,
  },
  {
    path: "/ListComment",
    name: "ListComment",
    component: ListCommentComponent,
  },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;