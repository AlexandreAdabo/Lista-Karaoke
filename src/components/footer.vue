<template>
  <div>
    <v-footer :padless="false">
      <v-card
        flat
        tile
        width="100%"
        class="green darken-2 lighten-1 text-center"
      >
        <v-card-text class="white--text">
          <a
            href="https://api.whatsapp.com/send?phone=55119817944000&text=Ol%C3%A1%2C%20Gostaria%20de%20alugar%20uma%20m%C3%A1quina%20de%20videok%C3%AA%20com%20voc%C3%AA!"
          >
            <v-icon x-large color="white"> mdi-whatsapp </v-icon>
            <h4 class="numeroWhatsApp">
              (11) 93002-2662 (Nelson) / (11) 98179-4400 (Willian)
            </h4>
          </a>
        </v-card-text>
        <v-card-text class="less-space white--text">
          {{ `Sua lista pessoal de músicas de Karaokê!` }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ `© ${new Date().getFullYear()} Copyright. Develop By ` }}
          <a class="numeroWhatsApp" href="https://grupowebee.com/">Webee</a>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>
<script>
export default {
  name: "footerGeral",
  data() {
    return {};
  },
};
</script>
<style scoped>
.numeroWhatsApp {
  text-decoration: underline;
  color: white;
}

.less-space {
  margin: 0;
  padding: 0;
}
</style>
