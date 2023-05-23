import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'

createApp(App)
.use(WaveUI)
.mount('#app')

