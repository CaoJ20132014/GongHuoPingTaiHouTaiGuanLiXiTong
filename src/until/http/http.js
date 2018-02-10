import Axios from 'axios';
import qs from 'qs';

// Axios全局配置
Axios.defaults.timeout = 10000;
if (process.env.NODE_ENV == 'development') {
    Axios.defaults.baseURL = '/api' | '/weather';
} else {
	Axios.defaults.baseURL = 'https://a.91jfk.com';
}
// http request 拦截器
Axios.interceptors.request.use(
    config => {
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// http response 拦截器
Axios.interceptors.response.use(
    response => {
        if (response) {
            // console.log(response);
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)
export function fetch(url,params,method){
    if (method == 'GET' || method == 'get') {
        return new Promise((resolve, reject) => {
            Axios.get(url, {
                params: params
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        });
    } else if (method == 'POST' || method == 'post'){
        return new Promise((resolve, reject) => {
            Axios.post(url, qs.stringify(params)).then(response => {
                resolve(response.data);
            }, error => {
                reject(error)
            });
        });
    }
}