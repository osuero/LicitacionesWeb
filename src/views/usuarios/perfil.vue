<template>
  <v-container>
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="#4DD0E1"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          Consultar usuairo
          <v-icon>mdi-magnify</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Nuevo usuario
          <v-icon>mdi-account-multiple-plus</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item :value="'tab-' + 1">
          <v-card flat color="#E0F2F1">
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-data-table
                    :headers="headers"
                    :items="usuarios"
                    sort-by="calories"
                    class="elevation-1"
                  >
                    <template v-slot:top>
                      <v-toolbar flat>
                        <v-toolbar-title>Lista de usuarios</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                          <v-card>
                            <v-card-title class="headline"
                              >Desea eliminar este usuario?</v-card-title
                            >
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="error"
                                dark
                                @click="dialogDelete = false"
                                >Cancelar</v-btn
                              >
                              <v-btn color="success" dark @click="eliminar()"
                                >OK</v-btn
                              >
                              <v-spacer></v-spacer>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialog" persistent max-width="600px">
                          <v-card>
                            <v-card-title>
                              <span class="headline">Perfil de usuario</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      label="Nombre"
                                      v-model="usuarioEditar.primerNombre"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      label="Apellido"
                                      v-model="usuarioEditar.segundoNombre"
                                      hint="Apellido"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      label="Nombre de usuario*"
                                      hint="Nombre de usuario"
                                      persistent-hint
                                      v-model="usuarioEditar.nombreUsuario"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                    <v-text-field
                                      label="Correo electronico"
                                      v-model="usuarioEditar.correo"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="error" text @click="dialog = false">
                                Cerrar
                              </v-btn>
                              <v-btn color="success" text @click="actualizar()">
                                Guardar
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-icon small class="mr-2" @click="openEditDialog(item)">
                        mdi-pencil
                      </v-icon>
                      <v-icon small @click="openDialogDelete(item)">
                        mdi-delete
                      </v-icon>
                    </template>
                    <template v-slot:no-data>
                      <v-btn color="primary"> Recargar </v-btn>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row></v-card-text
            >
          </v-card>
        </v-tab-item>
        <v-tab-item :value="'tab-' + 2">
          <v-card flat color="#E8F5E9">
            <v-card-text>
              <v-row>
                <v-col cols="12" lg="4">
                  <v-card>
                    <v-card-text class="text-center pa-7">
                      <vue-letter-avatar
                        v-if="usuario.nombreUsuario"
                        :name="usuario.nombreUsuario"
                        size="40"
                        :rounded="true"
                      ></vue-letter-avatar>
                      <h4
                        class="mt-2 title blue-grey--text text--darken-2 font-weight-regular"
                      >
                        Nuevo Usuario
                      </h4>
                      <h6 class="subtitle-2 font-weight-light">Lalpe</h6>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" lg="8">
                  <v-card>
                    <v-card-text>
                      <h3
                        class="title blue-grey--text text--darken-2 font-weight-regular"
                      >
                        Perfil de usuario
                      </h3>
                      <h6 class="subtitle-2 font-weight-light">
                        Creación de usuario
                      </h6>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-text-field
                        v-model="usuario.nombreUsuario"
                        label="Nombre de usuario"
                        filled
                        background-color="transparent"
                      ></v-text-field>
                      <v-text-field
                        v-model="usuario.primerNombre"
                        label="Nombre"
                        filled
                        background-color="transparent"
                      ></v-text-field>
                      <v-text-field
                        v-model="usuario.segundoNombre"
                        label="Apellido"
                        filled
                        background-color="transparent"
                      ></v-text-field>
                      <v-text-field
                        type="email"
                        v-model="usuario.correo"
                        label="Correo electronico"
                        filled
                        background-color="transparent"
                      ></v-text-field>
                      <v-btn
                        class="text-capitalize mt-5 element-0"
                        color="warning"
                        @click="crear"
                        ><v-icon>mdi-content-save</v-icon> Guardar</v-btn
                      >
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <v-row>
        <v-col sm="8">
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
            v-if="alertaErrorVisible"
            icon="mdi-close"
            dark
          >
            {{ textoErrorAlerta }}
          </v-alert>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VueLetterAvatar from "vue-letter-avatar";

Vue.use(VueLetterAvatar);

export default {
  name: "Profile",

  data: () => ({
    textoErrorAlerta: null,
    textoAlerta: null,
    alertaVisible: false,
    alertaErrorVisible: false,
    dialogDelete: false,
    dialog: false,
    usuario: {
      primerNombre: null,
      segundoNombre: null,
      nombreUsuario: null,
      correo: null,
      eliminado: false,
      deshabilitado: false,
    },
    usuarioEditar: {
      primerNombre: null,
      segundoNombre: null,
      nombreUsuario: null,
      correo: null,
      eliminado: null,
      deshabilitado: null,
    },

    headers: [
      { text: "Nombre usuario", value: "nombreUsuario" },
      { text: "Nombre", value: "primerNombre" },
      { text: "Apellido", value: "segundoNombre" },
      { text: "Correo electronico", value: "correo" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    usuarios: [],
    tab: null,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  }),
  methods: {
    crear() {
      axios
        .post("usuario", this.usuario)
        .then(() => {
          this.usuario = {};
          this.mensanjeValidacion("El usuario fue creado con exito");
          setInterval(() => {
            this.cargar();
          }, 5000);
        })
        .catch(() => {
          this.alertaErrorVisible(
            "Ha ocurrido un error tratando de crear el usuario"
          );
        });
    },
    cargar() {
      axios
        .get("Usuario/GetAll")
        .then((response) => (this.usuarios = response.data));
    },
    eliminar() {
      this.usuarioEditar.eliminado = true;
      axios.put("Usuario", this.usuarioEditar).then(() => {
        this.mensanjeValidacion(
          "El usuario fue borrado de manera satisfactoria"
        );
        this.dialogDelete = false;
        setTimeout(function () {
          this.cargar();
        }, 2000);
      });
    },
    actualizar() {
      axios
        .put(`Usuario`, this.usuarioEditar)
        .then(() => {
          setTimeout(function () {
            this.cargar();
          }, 2000);
          this.dialog = false;
        })
        .then(() => {
          this.mensanjeValidacion(
            "El usuario ha sido actualizado de manera satisfactoria"
          );
        })
        .catch(() => {
          this.mensanjeError(
            "ocurrio un error tratando de actualizar los campos"
          );
        });
    },
    openDialogDelete(item) {
      this.dialogDelete = true;
      this.usuarioEditar = item;
    },
    openEditDialog(item) {
      this.dialog = true;
      this.usuarioEditar = item;
    },
    mensanjeValidacion(texto) {
      this.textoAlerta = texto;
      this.alertaVisible = true;
      setInterval(() => {
        this.alertaVisible = false;
        this.textoAlerta = "";
      }, 5000);
    },
    mensanjeError(texto) {
      this.textoErrorAlerta = texto;
      this.alertaErrorVisible = true;
      setInterval(() => {
        this.alertaErrorVisible = false;
        this.alertaVisible = false;
        this.textoErrorAlerta = "";
      }, 5000);
    },
  },
  mounted() {
    this.cargar();
  },
  components: {},
};
</script>
