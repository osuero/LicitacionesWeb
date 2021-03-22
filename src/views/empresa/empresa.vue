<template>
<v-row no-gutters>
      <v-col
        sm="2"
      >
      </v-col>
    <v-col
        sm="8"
      >
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
        <v-stepper
            v-model="e13"
            width="max"
            vertical
        >
        <v-stepper-step step="1">
        Información compañía
        </v-stepper-step>
        <v-stepper-content step="1">
        <v-btn flat slot="activar" class="success">Agregar información de la empresa </v-btn>
            <v-card-title>
                Editar compañía
            </v-card-title>
                  <v-text-field
                  :counter="50"
                  label="Nombre/ Razón Social del Oferente:"
                  v-model="empresa.razonSocial"
                  required
                  ></v-text-field>
                <v-text-field
                v-model="empresa.nombreJuridico"
                :counter="150"
                label="Si se trata de una asociación temporal o Consorcio, nombre jurídico de cada miembro:"
                required
                ></v-text-field>
                <v-text-field
                :counter="20"
                v-model="empresa.identificacion"
                label="RNC/ Cédula/ Pasaporte del Oferente:"
                required
                ></v-text-field>
                <v-text-field
                v-model="empresa.registroProveedor"
                label="RPE del Oferente:"
                required
                ></v-text-field>
                <v-text-field
                label="Domicilio legal del Oferente:"
                v-model="empresa.domicilioLegal"
                required
                ></v-text-field>
                <v-btn
                    color="yellow darken-4"
                    @click="e13 = 2"
                    dark
                >
                    Continuar
                </v-btn>
                </v-stepper-content>

                <v-stepper-step
                step="2"
                complete
                >
                Información del Representante autorizado del Oferente
                </v-stepper-step>

                <v-stepper-content step="2">
                    <v-card-title>
                        Editar representante
                    </v-card-title>
                        <v-text-field label="Nombre:"  v-text="representante.nombre"  v-model="representante.nombre" required></v-text-field>
                        <v-text-field label="Dirección:"  v-model="representante.direccion" required></v-text-field>
                        <v-text-field label="Números de teléfono y fax:" v-model="representante.telefono" required></v-text-field>
                        <v-text-field label="Dirección de correo electrónico:"  v-model="representante.correo" required></v-text-field>
                    <v-btn
                        color="yellow darken-4"
                        @click="e13 = 1"
                        left
                        dark
                    >
                        Regresar
                    </v-btn>
                    <v-btn
                        color="primary"
                        right
                        absolute
                        :loading="cargando"
                        @click="guardarDatos"
                    >
                        Guardar
                    </v-btn>
                    </v-stepper-content>
            </v-stepper>
        </v-form>
    </v-col>
    <v-col  sm="2">    
      <v-alert
        border="right"
        color="light-green darken-1"
        v-if="alertaVisible"
        icon="mdi-check"
        dark
      >
        {{textoAlerta}}
      </v-alert>
      <v-alert
        border="right"
        color="deep-orange darken-4"
        v-if="alertaErrorVisible"
        icon="mdi-close"
        dark
      >
        {{textoErrorAlerta}}
      </v-alert>
    </v-col>
</v-row>
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({
      valid: true,
      e13: 2,
      name: '',
      textoAlerta: '',
      textoErrorAlerta: '',
      alertaVisible: false,
      alertaErrorVisible: false,
      empresa: {
        razonSocial: null,
        nombreJuridico: null,
        identificacion: null,
        registroProveedor: null,
        domicilioLegal: null,
      },
      representante: {
        nombre: null,
        telefono: null,
        otrosContactos: null,
        direccion: null,
        correo: null,
      },
      cargando: false,
    }),

    methods: {
      
      validate () {
        this.$refs.form.validate().then(() =>{
          this.actualizarEmpresa()
          this.actualizarRepresentante()
        })
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      mensanjeValidacion (texto) {
        this.textoAlerta = texto
        this.alertaVisible = true
            setInterval(() => {
              this.alertaVisible = false
              this.textoAlerta = ''
        }, 2500)
      },
      mensanjeError (texto) {
        this.textoErrorAlerta = texto
        this.alertaErrorVisible = true
            setInterval(() => {
              this.alertaErrorVisible = false
               this.alertaVisible = false
              this.textoErrorAlerta = ''
        }, 2500)
      },
      actualizarEmpresa () {
          this.cargando = true
          axios.put(`negocio`, this.empresa).then(()=> {
            this.cargando = false
          }).then(()=>{
            this.cargando= false 
            }).catch(() =>{
              this.cargando= false
              this.mensanjeError('Ha ocurrido un error guardando empresa')
        })
      },
      actualizarRepresentante () {
          this.cargando = true
          axios.put(`representante`, this.representante).then(()=> {
            this.cargando = false
            this.mensanjeValidacion('Los campos fueron actualizados')
          }).then(()=>{
            this.cargando= false 
            }).catch(() =>{
              this.cargando= false
              this.mensanjeError('Ha ocurrido un error guardando representante')
            })
      },
      cargarDatos () {
        axios.get(`negocio`).then(res => {
            if(res.data[0]) {
                this.empresa = res.data[0]
            }
        }).then(()=>{
        this.resetValidation()
      })
        axios.get(`representante`).then(res => {
          if(res.data[0]) {
              this.representante = res.data[0]
          }
      }).then(()=>{
        this.resetValidation()
      })
      },
      guardarDatos () {
        this.actualizarEmpresa()
        this.actualizarRepresentante()
      }
    },
    mounted() {
      this.cargarDatos()
    }
  }
</script>