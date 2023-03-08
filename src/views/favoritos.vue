<template>
  <div>
    <BtnListaFavoritos></BtnListaFavoritos>
    <VueGrid :UserAdmin="false" :Favoritos="true" />
  </div>
</template>
<script>
import VueGrid from "../components/grid.vue";
export default {
  name: "favoritosComponent",
  components: {
    VueGrid,
    BtnListaFavoritos: () => import("../components/BtnListaFavoritos.vue"),
  },
  data: () => ({
    //
  }),
};
</script>
<style scoped></style>
