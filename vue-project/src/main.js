// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'

const app = createApp(App)

app.use(WaveUI, {})
app.mount('#app')

// createApp(App).mount('#app')
