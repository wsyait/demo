//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css"
/*console.log(nprogress);   输出结果表明是个nprogress是个对象  */
//start方法： 代表进度条开始 （请求拦截器俘获到请求的时候）
//done方法：代表进度条结束

//1.利用axios对象的方法create,去创建一个axios实例
let requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径后面会出现api
    baseURL:"/mock",
    //代表请求超时的时间是5s
    timeout:5000
});
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情

requests.interceptors.request.use((config)=>{
    //config:配置对象，对象里面有一个属性很重要，header请求头
    //进度条开始动
    nprogress.start();
    return config;
});

//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    //进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
    //响应失败的回调函数
    return Promise.reject(new Error('faile'));
});

//对外暴露
export default requests;
