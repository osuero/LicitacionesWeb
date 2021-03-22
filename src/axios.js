import axios from 'axios'
import store from '../src/store/index'

 //axios.defaults.baseURL = 'http://desarrollosos-001-site1.gtempurl.com/api/'
 axios.defaults.baseURL = 'https://localhost:44376/api/'

axios.defaults.headers.common['Authorization'] =  store.getters.token
//axios.defaults.headers.common['Authorization'] = store.getState().session.token;

// axios.defaults.headers.common['Authorization'] = TOKEN;