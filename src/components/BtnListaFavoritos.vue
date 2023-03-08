<template>
  <div>
    <v-col cols="12">
      <v-img
        :src="require('../../public/logo-removebg.png')"
        class="my-3"
        contain
        height="200"
      />
    </v-col>
    <div class="btn-central">
      <v-btn
        class="shadow-2 margin1"
        @click="Grid()"
        color="green darken-2"
        outlined
        rounded
        elevation="8"
      >
        <v-icon left dark> mdi-grid </v-icon>
        Lista
      </v-btn>

      <v-btn
        class="margin1 shadow-2"
        @click="Favoritos()"
        color="green darken-2"
        outlined
        rounded
        elevation="8"
      >
        <v-icon left dark> mdi-star </v-icon>
        Favoritos
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: "BtnListaFavoritos",
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
