import axios from 'axios'
const baseURL = 'https://conduit.productionready.io'
export const request = axios.create({
    baseURL
})
//通过插件来获取上下文对象（query. store,params...）
export default ({ store }) => {
    request.interceptors.request.use(function (config) {
        const { user } = store.state
        if (user && user.token) {
            config.headers.Authorization = "Token " + user.token

        }
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
}
