const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer:{
    host:'0.0.0.0',
    port:6103,
    client: {
      webSocketURL: 'ws://0.0.0.0:8999/ws'
    },
    headers:{
      'Access-Control-Allow-Origin':'*',}
  },
  //3-10行都是自己百度加的 用来避免以下代码报错
  //WebSocketClient.js:13 WebSocket connection to 'ws://192.168.1.4:8080/ws' failed: 
  transpileDependencies: true
});


module.exports={
  // 关闭eslint
  lintOnSave:false,
  //代理跨域 在有/api的地址上 代理第三方就会工作 找真实的服务器
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
       /*  pathRewrite: {'^/api' : ''}  这个是路径重写 因为项目中的地址都带有api 所以这个可以不用*/
      }
    }
  }
}