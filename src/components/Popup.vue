<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn outlined color="teal lighten-3" dark v-on="on"
          >Nueva licitación</v-btn
        >
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Nueva licitación</span>
        </v-card-title>
        <v-form class="px-3" ref="form">
          <v-card-text>
            <v-row>
              <v-col cols="6" lg="6">
                <v-text-field
                  label="Codigo licitación"
                  v-model="content"
                  prepend-icon="edit"
                  :rules="inputRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="12">
                <v-text-field
                  label="Titulo"
                  v-model="title"
                  prepend-icon="folder"
                  :rules="inputRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="12">
                <v-text-field
                  label="Nombre institución"
                  v-model="title"
                  prepend-icon="domain"
                  :rules="inputRules"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="listaLogo"
                  :filter="customFilter"
                  color="white"
                  item-value="id"
                  prepend-icon="image"
                  item-text="nombre"
                  label="Logo institución"
                ></v-autocomplete
              ></v-col>
              <v-col cols="12" lg="6">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dateFormatted"
                      label="Fecha"
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      prepend-icon="event"
                      @blur="date = parseDate(dateFormatted)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Cancelar</v-btn
            >
            <v-btn color="green" text outlined @click="guardar">Guardar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  data: (vm) => ({
    dialog: false,
    title: "",
    content: "",        
    model: null,
    listaLogo: [
    ],
    due: null,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    inputRules: [(v) => v.length >= 3 || "El valor minimo son 3 caracteres"],
  }),
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${year}/${month}/${day}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    customFilter (item, queryText) {
        const textOne = item.nombre.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 
      },
      cargarLogos () {
      axios.get("archivo/cargarLogos").then((res) => {
        this.listaLogo = res.data;
      });
    },
    guardar () {
      axios.post('archivo/generar')
    }
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  mounted() {
    this.cargarLogos()
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
};
</script>