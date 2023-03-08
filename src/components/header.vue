<template>
  <div>
    <v-app-bar app color="green darken-2" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Karaokê Logo"
          class="shrink mr-2 margin1"
          contain
          src="../../public/logo-removebg.png"
          @click="$router.push('/home')"
          transition="scale-transition"
          width="40"
        />
        <div class="margin1" @click="$router.push('/home')">
          Lista de Músicas
        </div>
      </div>

      <v-spacer />

      <v-icon
        class="marginIcon"
        dark
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        {{
          `${
            $vuetify.theme.dark
              ? "mdi-weather-night"
              : "mdi-white-balance-sunny"
          }`
        }}
      </v-icon>

      <v-btn
        class="shadow-2"
        @click="$router.push('/login')"
        outlined
        rounded
        elevation="2"
      >
        <v-icon left dark> mdi-account </v-icon>
        Login
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "headerGeral",
  data: () => ({
    //
  }),
};
</script>
<style scoped>
.margin1 {
  margin: 0.5vw 0.4vh;
  padding: 0;
}

.marginIcon {
  margin: 3vw 2vh;
}

.shadow-2 {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
