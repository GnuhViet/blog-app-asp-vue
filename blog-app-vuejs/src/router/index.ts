import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import CreateArticle from '../views/CreateArticle.vue';
import ArticleDetails from '../views/ArticleDetails.vue';
import ArticleManage from '../views/ArticleManage.vue';
import ArticleEdit from '../views/ArticleEdit.vue';
import CategoryFilter from '../views/CategoryFilter.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: Profile },
  { path: '/create', component: CreateArticle },
  { path: '/manage', component: ArticleManage },
  {
    path: '/details/:id',
    name: 'ArticleDetails',
    component: ArticleDetails,
  },
  {
    path: '/edit/:id',
    name: 'ArticleEdit',
    component: ArticleEdit,
  },
  {
    path: '/category/:code',
    name: 'CategoryFilter',
    component: CategoryFilter,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
