import axios from 'axios'
import config from './config'
import {loading,success,fail} from '@/util/toast.js'


const contact = axios.create({
    baseURL:config.baseURL || '',
    timeout:config.timeout || 10000
})

contact.interceptors.request.use(function (axiosConfig) {
    loading()
    config.hooks && config.hooks.beforeReq && config.hooks.beforeReq()
    return axiosConfig;
  });


contact.interceptors.response.use(function (response) {
    success()
    config.hooks && config.hooks.afterReq && config.hooks.afterReq()
    return response.data;
  }, function (error) {
    fail()
    config.hooks && config.hooks.afterReq && config.hooks.afterReq()
    return Promise.reject(error);
  });
  export default contact