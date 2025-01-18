import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import 'vue-good-table-next/dist/vue-good-table-next.css';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: {
        dark: false,
        colors: {
          primary: 'rgb(85, 183, 199)',   
          dark: 'rgb(38, 49, 100)',   
        },
      },
    },
  },
})

const app = createApp(App)

app.use(vuetify)
app.use(Toast, {
  position: 'top-right',
  timeout: 3000
})

app.mount('#app')
