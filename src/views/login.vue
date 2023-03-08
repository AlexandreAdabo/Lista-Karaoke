<template>
  <div>
    <h2 class="titulo">Faça seu Login</h2>
    <div class="titulo">
      <v-form ref="form" v-model="valid">
        <v-text-field
          dense
          required
          :rules="[(v) => !!v || 'E-mail é obrigatório']"
          stack-label
          v-model="email"
          prepend-icon="mdi-email"
          :append-icon="email.length == 0 ? '' : `mdi-close`"
          @click:append="email = ''"
          rounded
          outlined
          style="width: 300px"
          color="green darken-2"
          label="E-mail"
        />
        <v-text-field
          dense
          required
          :rules="[(v) => !!v || 'Senha é obrigatório']"
          stack-label
          v-model="senha"
          prepend-icon="mdi-lock"
          :append-icon="senha.length == 0 ? '' : `mdi-close`"
          @click:append="senha = ''"
          type="password"
          rounded
          outlined
          style="width: 300px"
          color="green darken-2"
          label="Senha"
        />
        <!-- <v-btn plain rounded @click="$router.push('/forgotPassword')"
          >Esqueceu sua senha ?</v-btn
        > -->
        <v-checkbox v-model="lembraSenha" label="Lembrar-me"></v-checkbox>

        <v-btn @click="Entrar()" class="margin1" rounded color="success">
          Entrar
        </v-btn>
        <v-btn
          color="warning"
          class="margin1"
          rounded
          @click="(email = ''), (senha = ''), (lembraSenha = false)"
        >
          Limpar
        </v-btn>
        <!-- <div class="margin1">
          Ainda não tem um cadastro ?
          <v-btn plain rounded @click="$router.push('/newUser')"
            >Clique aqui!</v-btn
          >
        </div> -->
      </v-form>

      <v-alert
        v-model="msgAlertCerto"
        dismissible
        shaped
        color="green"
        border="left"
        elevation="2"
        colored-border
        icon="mdi-thumb-up"
        transition="scale-transition"
      >
        Fazendo <strong>Login</strong>.
      </v-alert>
      <v-alert
        v-model="msgAlertErrado"
        dismissible
        color="red"
        border="left"
        elevation="2"
        colored-border
        icon="mdi-alert-circle"
      >
        Usuário ou senha <strong>errado</strong>!
      </v-alert>
    </div>
  </div>
</template>
<script>
import firebase from "../firebase";

export default {
  name: "loginComponent",
  components: {},
  data: () => ({
    lembraSenha: false,
    valid: false,
    msgAlertCerto: false,
    msgAlertErrado: false,
    email: "",
    senha: "",
  }),
  methods: {
    async Entrar() {
      if (this.$refs.form.validate()) {
        let login = await firebase.loginUser(this.email, this.senha);
        if (login) {
          this.$router.push("/edit");
        } else {
          this.$refs.form.reset();
        }
      } else {
        this.msgAlertErrado = true;
        return this.$refs.form.reset();
      }
    },
  },
};
</script>
<style scoped>
@import url("./views.css");
</style>
