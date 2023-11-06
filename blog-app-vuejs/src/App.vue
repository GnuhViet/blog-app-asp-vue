<template>
  <Header />
  <div class="s-content">
    <router-view />
  </div>
  <!-- end s-content -->
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
export default {
  components: {
    Header, 
    Footer
  }
};
</script>
