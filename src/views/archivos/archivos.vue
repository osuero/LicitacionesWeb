<template>
  <v-container>
    <v-layout row wrap>
      <v-flex sm6 xs12 md6 lg3>
        <v-card class="ma-3">
          <v-list-item>
            <v-list-item-avatar tile class="mt-n7">
              <v-sheet color="green" width="80" height="80" elevation="10">
                <v-icon dark large>file_present</v-icon>
              </v-sheet>
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="overline text-right">Total archivos</div>
              <v-list-item-title class="headline mb-1 text-right"
                >{{ listadoArchivos.length  }}</v-list-item-title
              >
              <div><v-divider></v-divider></div>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-icon text class="ma-2">attach_file</v-icon>
            <div class="overline">Archivos subidos</div>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <v-card class="ma-3">
          <v-list-item>
            <v-list-item-avatar tile class="mt-n7">
              <v-sheet color="#F44336" width="80" height="80" elevation="10">
                <v-icon dark large>mdi-file-document-multiple</v-icon>
              </v-sheet>
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="overline text-right">Documentos</div>
              <v-list-item-title class="headline mb-1 text-right"
                > {{ listaArchivos.length }}    </v-list-item-title
              >
              <div><v-divider></v-divider></div>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-icon text class="ma-2">create_new_folder</v-icon>
            <div class="overline">Documentos</div>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <v-card class="ma-3">
          <v-list-item>
            <v-list-item-avatar tile class="mt-n7">
              <v-sheet color="#FFC107" width="80" height="80" elevation="10">
                <v-icon dark large>perm_media</v-icon>
              </v-sheet>
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="overline text-right">Imagenes</div>
              <v-list-item-title class="headline mb-1 text-right"
                >{{ listaImagnes.length }}</v-list-item-title
              >
              <div><v-divider></v-divider></div>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-icon text class="ma-2">photo</v-icon>
            <div class="overline">Logos instituciones</div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="#4DD0E1"
        centered
        
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
         <b> Consultar Archivo </b>
          <v-icon>mdi-magnify</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
         <b> Cargar archivo </b>
          <v-icon>mdi-file-upload-outline</v-icon>
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
                    :items="listadoArchivos"
                    sort-by="calories"
                    class="elevation-1"
                    :search="buscar"
                  >
                    <template v-slot:[`item.fechaCreacion`]="{ item }">
                      {{ fechaLatina(item.fechacreacion) }}
                    </template>
                    <template v-slot:[`item.acciones`]="{ item }">
                      <v-icon small @click="descargar(item)">
                        mdi-download-circle
                      </v-icon>
                      <v-icon small @click="openDialogDelete(item)">
                        mdi-delete
                      </v-icon>
                    </template>
                    <template v-slot:top>
                      <v-toolbar flat>
                        <v-toolbar-title>Lista de archivos</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-text-field
                          v-model="buscar"
                          append-icon="mdi-magnify"
                          label="Buscar"
                          single-line
                          hide-details
                        ></v-text-field>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                          <v-card>
                            <v-toolbar color="primary" dark
                              >Confirmación
                            </v-toolbar>
                            <v-card-title class="headline"
                              >Desea eliminar este archivo?</v-card-title
                            >
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="error"
                                dark
                                @click="dialogDelete = false"
                                >Cancelar</v-btn
                              >
                              <v-btn
                                color="success"
                                dark
                                @click="eliminar(item)"
                                >OK</v-btn
                              >
                              <v-spacer></v-spacer>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialog" persistent max-width="600px">
                          <v-card>
                            <v-card-title>
                              <span class="headline">Datos del archivo</span>
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
                              <v-btn color="success" text> Guardar </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                    </template>

                    <template v-slot:actions="{ item }">
                      <v-icon small class="mr-2" @click="openEditDialog(item)">
                        mdi-pencil
                      </v-icon>
                      <v-icon small @click="openDialogDelete(item)">
                        mdi-delete
                      </v-icon>
                    </template>
                    <template v-slot:no-data>
                      <span>No hay datos disponible</span>
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
                  <v-card> </v-card>
                </v-col>
                <v-col cols="12" lg="8">
                  <v-card>
                    <v-card-text>
                      <h3
                        class="title blue-grey--text text--darken-2 font-weight-regular"
                      >
                        Carga de archivo
                      </h3>
                      <h6 class="subtitle-2 font-weight-light">
                        Información del archivo
                      </h6>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-file-input
                        label="Ruta del archivo"
                        outlined
                        v-model="archivo"
                        dense
                      ></v-file-input>
                      <v-btn
                        class="text-capitalize mt-5 element-0"
                        color="warning"
                        :disabled="!archivo"
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
        <v-col sm="10">
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
import moment from "moment";

Vue.use(VueLetterAvatar);

export default {
  name: "Profile",

  data: () => ({
    buscar: "",
    cantidadArchivos: null,
    textoErrorAlerta: null,
    textoAlerta: null,
    alertaVisible: false,
    alertaErrorVisible: false,
    dialogDelete: false,
    dialog: false,
    archivo: null,
    itemEliminar: {},
    listadoArchivos: [],
    usuarioEditar: {
      primerNombre: null,
      segundoNombre: null,
      nombreUsuario: null,
      correo: null,
      eliminado: null,
      deshabilitado: null,
    },

    headers: [
      { text: "Nombre archivo", value: "nombre" },
      { text: "Extension", value: "extension" },
      { text: "Fecha creación", value: "fechaCreacion" },
      { text: "Acciones", value: "acciones", align: "right" },
    ],
    usuarios: [],
    tab: null,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  }),
  methods: {
    crear() {
      let formData = new FormData();
      formData.append("file", this.archivo);
      axios
        .post("archivo/guardar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.mensanjeValidacion("El archivo se cargo de manera correcta");
          this.archivo = null;
          this.seleccionarTodo();
          this.tab = 'tab-1'
        })
        .catch(() => {
          this.mensanjeError("No se pudo cargar el archivo");
        });
    },
    eliminar() {
      axios
        .delete("archivo/eliminar", { params: { id: this.itemEliminar.id } })
        .then(() => {
          this.itemEliminar = {};
          this.seleccionarTodo();
          this.dialogDelete = false;
          this.mensanjeValidacion =
            "El archivo se ha eliminado de manera satisfactoria.";
        })
        .catch(() => {
          this.mensanjeError(
            "Ha ocurrido un error tratando de eliminar el archivo."
          );
        });
    },
    openDialogDelete(item) {
      this.dialogDelete = true;
      this.itemEliminar = item;
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
    descargar(item) {
      axios
        .get("archivo/Visualizar", { params: { id: item.id } })
        .then((response) => {
          var archivoBit = response.data;
          this.descargarNuevo(archivoBit, item.nombre);
        });
    },
    descargarNuevo(archivoBit, nombre) {
      fetch("data:application/pdf;base64," + archivoBit)
        .then((resp) => {
          return resp.blob();
        })
        .then((blob) => {
          var a = window.document.createElement("a");
          a.href = window.URL.createObjectURL(blob, {
            type: "application/pdf",
          });
          a.download = nombre;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
    },
    fechaLatina(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    seleccionarTodo() {
      axios.get("archivo").then((res) => {
        this.listadoArchivos = res.data;
      });
    },
  },
  filtrarImagenes () {

  },
  mounted() {
    this.seleccionarTodo();
  },
  computed: {
    listaImagnes () {
      return this.listadoArchivos.filter((archivo)=>{
  
          return archivo.extension.toLowerCase() === '.png' || archivo.extension.toLowerCase() === '.jpg'
        })
    },
    listaArchivos () {
       return this.listadoArchivos.filter((archivo)=>{
  
          return archivo.extension.toLowerCase() === '.pdf' || 
                  archivo.extension.toLowerCase() === '.doc'|| 
                  archivo.extension.toLowerCase() === '.docm' || 
                  archivo.extension.toLowerCase() === '.docx' || 
                  archivo.extension.toLowerCase() === '.xlsx'|| 
                  archivo.extension.toLowerCase() === '.csv'|| 
                  archivo.extension.toLowerCase() === '.xlsm'
       })
    }
  },
  components: {},
};
</script>
