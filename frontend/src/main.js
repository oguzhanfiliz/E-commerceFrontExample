import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ApiService from '@/services/ApiService'
import Toaster from "@meforma/vue-toaster";

axios.defaults.baseURL = 'https://nonchalant-fang.glitch.me/'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const app = createApp(App);

app.use(Toaster);
app.use(store);
app.use(router);
ApiService.init(app);

app.mount("#app");