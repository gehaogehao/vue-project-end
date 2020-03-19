import axios from 'axios'
import config from './config'
import {loading,success,fail} from '@/util/toast.js'

const layout = axios.create({
    baseURL:config.baseURL || '',
    timeout:config.timeout || 10000
})

layout.interceptors.request.use(function (axiosConfig) {
    config.clearToast && config.clearToast ? "" : loading()
    config.hooks && config.hooks.beforeReq && config.hooks.beforeReq()
    return axiosConfig;
  });


layout.interceptors.response.use(function (response) {
  config.clearToast && config.clearToast ? "" : success()
  config.hooks && config.hooks.afterReq && config.hooks.afterReq()
  return response.data;
}, function (error) {
  config.clearToast && config.clearToast ? "" : fail()
  config.hooks && config.hooks.afterReq && config.hooks.afterReq()
  return Promise.reject(error);
});
export default layout
  