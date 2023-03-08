<template>
  <div>
    <BtnListaFavoritos></BtnListaFavoritos>
    <VueGrid :UserAdmin="false" />
  </div>
</template>
<script>
import VueGrid from "../components/grid.vue";

export default {
  name: "homeComponent",
  components: {
    VueGrid,
    BtnListaFavoritos: () => import("../components/BtnListaFavoritos.vue"),
  },
  data: () => ({
    //
  }),
  methods: {
    Grid() {
      this.$router.push("/home");
    },
    Favoritos() {
      this.$router.push("/favoritos");
    },
  },
};
</script>
<style scoped>
.btn-central {
  display: flex;
  justify-content: center;
}

.margin1 {
  margin: 0.5vw 0.4vw;
  padding: 0;
}

.shadow-2 {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
