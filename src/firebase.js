import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

////Autenticação FireStore

//////////////////////////////////////////////////

const firebaseConfig = {
  apiKey: "AIzaSyC3Y8hXwAAsPaDQcxVM5FlWuc2OD4YxEIs",
  authDomain: "karaokelist-b1dd5.firebaseapp.com",
  projectId: "karaokelist-b1dd5",
  storageBucket: "karaokelist-b1dd5.appspot.com",
  messagingSenderId: "346101164794",
  appId: "1:346101164794:web:d94dfc35c891cbe26a7743",
  measurementId: "G-0E886XWRW4",
};
const firebaseApp = initializeApp(firebaseConfig);
var ListaJSON = require("./List2.json");
ListaJSON = ListaJSON.__collections__;

export default {
  // Initialize Firebase
  async getUsuarios() {
    const db = getFirestore(firebaseApp);
    const citiesCol = collection(db, "Usuarios");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => doc.data());
    return cityList;
  },

  criaUsuario(email, senha) {
    const firebase = initializeApp(firebaseConfig);
    //Autenticação
    const auth = getAuth(firebase);
    //Criação de Usuário
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user, "USUÁRIO CADASTRADO");
      })
      .catch((error) => {
        console.log(error, "ERRO AO CADASTRAR O USUÁRIO");
        // ..
      });
    return createUserWithEmailAndPassword;
  },
  loginUser(email, senha) {
    const firebase = initializeApp(firebaseConfig);
    //Autenticação
    const auth = getAuth(firebase);
    //Login de Usuário
    let result_login = signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        //return userCredential.user;
        return true;
      })
      .catch(() => {
        //return error;
        return false;
      });
    return result_login;
  },
  async ListMusic() {
    var ListFormat = [];
    //try {
    //const db = getFirestore(firebaseApp);
    //const Musics = collection(db, "Musicas");
    //const ListMusic = await getDocs(Musics);
    //ListFormat = ListMusic.docs.map((doc) => doc.data());
    //} catch {
    let chave = Object.keys(ListaJSON.Musicas);
    let valor = Object.values(ListaJSON.Musicas);
    chave.map((k, index) => {
      var objeto = {};
      objeto = valor[index];
      objeto.FAVORITOS = false;
      ListFormat.push(objeto);
    });
    ListFormat.map((list) => {
      list.FAVORITOS = "Não";
    });
    if (localStorage.Favoritado !== undefined) {
      let Favoritado = JSON.parse(localStorage.Favoritado);
      Favoritado.map((f) => {
        ListFormat.map((l) => {
          if (l.COD == f.COD) {
            l.FAVORITOS = "Sim"; //f.FAVORITOS;
          }
        });
      });
    }
    //}
    return ListFormat;
  },
};
