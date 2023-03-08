<template>
  <div>
    <h2 class="titulo">Gerencie sua lista de músicas</h2>
    <v-col cols="12">
      <v-img
        :src="require('../../public/logo-removebg.png')"
        class="my-3"
        contain
        height="200"
      />
    </v-col>
    <VueGrid :UserAdmin="true" />
  </div>
</template>
<script>
import VueGrid from "../components/grid.vue";
export default {
  name: "editList",
  components: { VueGrid },
  //data: () => ({}),
  //methods: {},
};
</script>
<style scoped>
@import url("./views.css");
</style>
