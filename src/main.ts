import { createApp } from 'vue'
import './styles/styles.scss'
import 'uno.css';
import App from './App.vue'
import { getToken } from './api/token';

function bootstrapApp() {
  const app = createApp(App);
  getToken();
  app.mount('#app');
}

bootstrapApp();