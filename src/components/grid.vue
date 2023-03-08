<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="dataSource"
          :items-per-page="10"
          :search="search"
          :custom-filter="filtraTabela"
          dense
          :loading="searchState"
          loading-text="Carregando... Aguarde"
          class="elevation-1 shadow-2 borda-2"
        >
          <template v-slot:top>
            <v-text-field
              v-if="Favoritos == false"
              v-model="search"
              color="green darken-2"
              label="Pesquise por nome/código da música ou Cantor"
              class="elevation-3 shadow-2 borda-2"
              outlined
              rounded
              dense
              append-icon="mdi-magnify"
              hide-details="auto"
            ></v-text-field>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-if="UserAdmin"
              @input="inputMusic"
              v-model="newMusic"
              width="500"
              ><template v-slot:activator="{ on, attrs }">
                <v-btn
                  rounded
                  color="green darken-2"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Nova Música
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  {{ titleDialog }}
                </v-card-title>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    dense
                    required
                    :rules="[(v) => !!v || 'O Código é obrigatório']"
                    stack-label
                    v-model="linha.codigo"
                    prepend-icon="mdi-cards-diamond"
                    :append-icon="linha.codigo.length == 0 ? '' : `mdi-close`"
                    @click:append="linha.codigo = ''"
                    rounded
                    outlined
                    style="width: 300px"
                    color="green darken-2"
                    label="Código"
                  />
                  <v-text-field
                    dense
                    required
                    :rules="[(v) => !!v || 'Cantor é obrigatório']"
                    stack-label
                    v-model="linha.cantor"
                    prepend-icon="mdi-microphone-outline"
                    :append-icon="linha.cantor.length == 0 ? '' : `mdi-close`"
                    @click:append="linha.cantor = ''"
                    rounded
                    outlined
                    style="width: 300px"
                    color="green darken-2"
                    label="Cantor"
                  />
                  <v-text-field
                    dense
                    required
                    :rules="[(v) => !!v || 'Música é obrigatório']"
                    stack-label
                    v-model="linha.musica"
                    prepend-icon="mdi-music"
                    :append-icon="linha.musica.length == 0 ? '' : `mdi-close`"
                    @click:append="linha.musica = ''"
                    rounded
                    outlined
                    style="width: 300px"
                    color="green darken-2"
                    label="Música"
                  />
                  <v-text-field
                    dense
                    stack-label
                    v-model="linha.InicioMusica"
                    prepend-icon="mdi-play"
                    :append-icon="
                      linha.InicioMusica.length == 0 ? '' : `mdi-close`
                    "
                    @click:append="linha.InicioMusica = ''"
                    rounded
                    outlined
                    style="width: 300px"
                    color="green darken-2"
                    label="Início da Música"
                  />
                </v-form>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-2" text @click="newMusic = false"
                    >SALVAR</v-btn
                  >
                  <v-btn color="green darken-2" text @click="newMusic = false"
                    >CANCELAR</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Deseja realmente excluir essa música ?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text>Confirmar</v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialogDelete = false"
                    >Cancelar</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:no-results>
            <div>Nenhuma música encontrada</div>
          </template>
          <template v-slot:[`item.COD`]="{ item }">
            <v-chip
              :color="
                item.FAVORITOS == 'Sim' ? 'green darken-2' : 'grey lighten-1'
              "
              dark
            >
              {{ item.COD }}
            </v-chip>
          </template>
          <template v-slot:[`item.FAVORITOS`]="{ item }">
            <v-btn
              icon
              @click="onFavoritos(item)"
              :color="
                item.FAVORITOS == 'Sim' ? 'yellow darken-3' : 'yellow lighten-3'
              "
            >
              <v-icon dark>mdi-star</v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "../firebase";

export default {
  name: "gridComponent",

  props: {
    UserAdmin: { type: Boolean, default: false },
    Favoritos: { type: Boolean, default: false },
  },

  data() {
    return {
      search: "",
      searchState: false,
      titleDialog: "Nova Música",
      newMusic: false,
      dialogDelete: false,
      valid: false,
      linha: {
        codigo: "",
        cantor: "",
        musica: "",
        InicioMusica: "",
      },
      headers: [
        {
          text: "Código",
          align: "start",
          filterable: false,
          value: "COD",
        },
        { text: "Cantor", value: "CANTOR" },
        { text: "Música", value: "TITULO" },
        { text: "Início da Música", value: "INICIO_LETRA" },
        { text: "Favoritos", value: "FAVORITOS" },
        { text: "Editar/Excluir", value: "actions", sortable: false },
      ],
      dataSource: [],
    };
  },
  async created() {
    this.dataSource = await firebase.ListMusic();
    if (this.Favoritos) {
      this.headers.pop();
      this.headers.pop();
      return (this.dataSource = JSON.parse(localStorage.Favoritado));
    }
    if (this.UserAdmin == true) {
      //Se for Usuário Admin
    } else {
      this.headers.pop();
    }
  },
  methods: {
    filtraTabela(value, search, item) {
      this.searchState = true;
      let result =
        (!!value &&
          !!search &&
          value !== undefined &&
          (item.COD.indexOf(search) != -1 ||
            value.toString().indexOf(search)) != -1) ||
        item.CANTOR.indexOf(search) != -1 ||
        item.INICIO_LETRA.indexOf(search) != -1 ||
        item.TITULO.indexOf(search) != -1;
      this.searchState = false;
      return result;
    },
    onFavoritos(e) {
      this.dataSource.map((element) => {
        if (e.FAVORITOS == "Sim") {
          element.FAVORITOS = "Não";
        }
        if (element.COD == e.COD) {
          element.FAVORITOS = "Sim"; //!element.FAVORITOS;
        }
      });
      var Filtrado = this.dataSource.filter((word) => word.FAVORITOS == "Sim");
      localStorage.Favoritado = JSON.stringify(Filtrado);
    },
    inputMusic() {
      this.linha = {
        codigo: "",
        cantor: "",
        musica: "",
        InicioMusica: "",
      };
      this.titleDialog = "Nova Música";
    },
    editItem(item) {
      this.linha.codigo = item.COD;
      this.linha.cantor = item.CANTOR;
      this.linha.musica = item.TITULO;
      this.linha.InicioMusica = item.carbs;
      this.titleDialog = "Editar Música";
      this.newMusic = true;
    },

    deleteItem(item) {
      console.log(item, "ITEM excluído");
      this.dialogDelete = true;
    },
  },
};
</script>
<style scoped>
@import url("./components.css");
.borda-2 {
  box-sizing: border-box;
}

.shadow-2 {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
