import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import { LayoutPlugin } from 'bootstrap-vue'
// import { ModalPlugin } from 'bootstrap-vue'
// import { CardPlugin } from 'bootstrap-vue'
// import { DropdownPlugin, TablePlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'
import '@/styles/index.scss' // global css

import axios from 'axios'
import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)
// Vue.use(LayoutPlugin)
// Vue.use(ModalPlugin)
// Vue.use(CardPlugin)
// Vue.use(DropdownPlugin)
// Vue.use(TablePlugin)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang
})
// const baseURL = 'http://domainmanagement.test'



const baseURL = 'https://lsnppa.watchtowermanagement.ng'

Vue.mixin({
  methods: {
    baseUrl() {
      return `${baseURL}`
    },
    dynamic_base_url(url) {
      return `${baseURL}/api/v1/${url}`
    },
    dynamic_site_name() {
      return (process.env.SITE_NAME) ? `${process.env.SITE_NAME}` : 'INSPPA'
    },
    dynamic_site_url() {
      return (process.env.SITE_URL) ? `${process.env.SITE_URL}` : null
    },
    dynamic_site_logo() {
      // console.log(process.env)
      return `${process.env.SITE_LOGO}`
    },
    isAdmin() {
      return store.getters.roles
    }
  }
})

Vue.use(VueSweetalert2)

// Define the formatDate function
function formatDate(dateString) {
  if (dateString === 'All') {
    return dateString;
  } else {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  }
}

// Register the formatDate function as a global filter
Vue.filter('formatDate', formatDate);

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
