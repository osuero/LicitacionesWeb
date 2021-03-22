<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-form v-on:submit.prevent="login">
                        <v-card-text class="mt-12">
                          <h1
                            class="text-center display-2 cyan--text text--darken-1"
                          >
                            Ingresa a tu cuenta
                          </h1>
                          <div class="text-center mt-4">
                            <v-btn class="mx-2" fab color="black" outlined>
                              <v-icon>mdi-hammer</v-icon>
                            </v-btn>

                            <v-btn class="mx-2" fab color="black" outlined>
                              <v-icon>mdi-account-hard-hat</v-icon>
                            </v-btn>
                            <v-btn class="mx-2" fab color="black" outlined>
                              <v-icon>mdi-home-city-outline</v-icon>
                            </v-btn>
                          </div>
                          <h4 class="text-center mt-4">
                            Utiliza el nombre de usario correcto
                          </h4>
                          <v-text-field
                            label="Usuario"
                            name="Usuario"
                            v-model="user.Username"
                            prepend-icon="person"
                            type="text"
                            @blur="validarUsuario"
                            color="teal accent-3"
                          />

                          <v-text-field
                            id="contrasena"
                            label="contrasena"
                            name="contrasena"
                            prepend-icon="lock"
                            v-model="user.Password"
                            type="password"
                            color="teal accent-3"
                          />
                        </v-card-text>
                        <div class="text-center mt-3">
                          <v-btn
                            rounded
                            color="cyan darken-1"
                            type="submit"
                            dark
                            >Ingresar</v-btn
                          >
                        </div>
                      </v-form>
                    </v-col>
                    <v-col cols="12" md="4" class="cyan darken-1">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hola amigo</h1>
                        <h5 class="text-center">
                          Si tu usuario fue creado y es la primera vez que
                          ingresas necesitas crear tu contraseña.
                        </h5>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-form v-on:submit.prevent="actualizarContrasena">
                    <v-row class="fill-height">
                      <v-col cols="12" md="4" class="cyan darken-1">
                        <v-card-text class="white--text mt-12">
                          <h1 class="text-center display-1">
                            Primera vez aqui?
                          </h1>
                          <h5 class="text-center">
                            Si estás aquí por primera vez necesitas cambiar tu
                            contraseña
                          </h5>
                        </v-card-text>
                      </v-col>

                      <v-col cols="12" md="8">
                        <v-card-text class="mt-12">
                          <h1
                            class="text-center display-2 cyan--text text--darken-1"
                          >
                            Crear contraseña
                          </h1>
                          <div class="text-center mt-4">
                            <v-btn class="mx-2" fab color="black" outlined>
                              <v-icon>mdi-shield-lock</v-icon>
                            </v-btn>

                            <v-btn class="mx-2" fab color="black" outlined>
                              <v-icon>mdi-account-lock</v-icon>
                            </v-btn>
                            <v-btn class="mx-2" fab color="black" outlined>
                              <v-icon>mdi-shield-off</v-icon>
                            </v-btn>
                          </div>
                          <h4 class="text-center mt-4">
                            Escribe una contraseña segura
                          </h4>

                          <v-text-field
                            id="password"
                            label="Contraseña"
                            name="password"
                            prepend-icon="lock"
                            v-model="user.contrasena"
                            type="password"
                            color="teal accent-3"
                          />
                        </v-card-text>
                        <div class="text-center mt-n5">
                          <v-btn
                            rounded
                            color="cyan darken-1"
                            type="submit"
                            dark
                            >Guardar</v-btn
                          >
                        </div>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>

          <v-overlay :z-index="zIndex" :value="cargar">
            <v-progress-circular
              :size="70"
              :width="7"
              color="purple"
              indeterminate
            ></v-progress-circular>
          </v-overlay>
        </v-row>
        <v-row>
          <v-col class="col-lg-2"> </v-col>
          <v-col class="col-lg-8">
            <v-alert
              border="right"
              color="light-green darken-1"
              v-if="alertaVisible"
              icon="mdi-check"
              dark
            >
              {{ textoAlerta }}
            </v-alert>
            <v-alert
              border="right"
              color="deep-orange darken-4"
              v-if="alertErrorVisible"
              icon="mdi-close"
              dark
            >
              {{ textoAlerta }}
            </v-alert>
          </v-col>
          <v-col class="col-lg-2"> </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import { LOGIN } from "../../store/actions-constant";

export default {
  data: () => ({
    step: 1,
    alertaVisible: false,
    alertErrorVisible: false,
    cargar: false,
    overlay: false,
    zIndex: 0,
    user: {
      Username: null,
      Password: null,
    },
    confirmacion: false,
  }),
  props: {
    source: String,
  },
  methods: {
    login() {
      this.cargar = true;
      axios
        .post(`Usuario/Authenticate`, this.user)
        .then((res) => {
          if (res.data) {
            this.$store.dispatch(LOGIN, res.data);
            axios.defaults.headers.common[
              "Authorization"
            ] = this.$store.getters.token;
            this.$router.push("/");
          }
        })
        .then(() => {
          this.cargar = false;
        })
        .catch(() => {
          this.cargar = false;
          this.mensanjeValidacionError(
            "Ha ocurrido un problema tratando de validar la cuenta"
          );
        });
    },
    mensanjeValidacion(texto) {
      this.textoAlerta = texto;
      this.alertaVisible = true;
      setInterval(() => {
        this.alertaVisible = false;
        this.textoAlerta = "";
      }, 5000);
    },
    mensanjeValidacionError(texto) {
      this.textoAlerta = texto;
      this.alertErrorVisible = true;
      setInterval(() => {
        this.alertErrorVisible = false;
        this.textoAlerta = "";
      }, 5000);
    },
    validarUsuario() {
      axios
        .get(`Usuario/ValidarUsuario`, {
          params: {
            usuario: this.user.Username,
          },
        })
        .then((res) => {
          if (res.data) {
            this.user = res.data;
            this.step = 2;
          }
        })
        .then(() => {
          this.cargar = false;
        })
        .catch(() => {
          this.cargar = false;
          this.mensanjeValidacionError(
            "Ha ocurrido un problema tratando de validar la cuenta"
          );
        });
    },
    actualizarContrasena() {
      this.user.Password = this.user.contrasena;
      this.user.Username = this.user.nombreUsuario;
      axios
        .put(`Usuario/ActualizarContrasena`, this.user)
        .then(() => {
          this.login();
        })
        .then(() => {
          this.mensanjeValidacion(
            "La contraseña  ha sido cambiada de forma satisfactoria"
          );
        })
        .catch(() => {
          this.mensanjeValidacionError(
            "Ha ocurrido un error al tratar de cambiar la contraseña"
          );
        });
    },
    redireccionar() {
      if (this.$store.getters.token) {
        this.$router.push("/");
      }
    },
  },
  mounted() {
    this.redireccionar();
  },
};
</script>