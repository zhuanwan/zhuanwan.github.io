title: linux部署node
---
node + nginx
<!-- more -->
## 文件目录
/usr/local：用户级的程序目录，可以理解为C:/Progrem Files/。用户自己编译的软件默认会安装到这个目录下。
/usr/src：系统级的源码目录。
/usr/local/src：用户级的源码目录。
[转](https://blog.csdn.net/aqxin/article/details/48324377)

## 安装nodejs
``` bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

source ~/.nvm/nvm.sh

nvm install node
```
[参考](https://blog.csdn.net/gaomengwang/article/details/77540429)
备注：[node包地址](http://nodejs.org/dist/)

## python安装(不报错跳过)
``` bash
wget http://www.python.org/ftp/python/2.7.6/Python-2.7.6.tar.xz  //下载

yum install xz-libs  //解压工具如果没有就安装
xz -d Python-2.7.6.tar.xz  //解压
tar -xvf Python-2.7.6.tar

cd Python-2.7.6
./configure --prefix=/usr/local
//我们需要自己安装Python 2.7.6。但是值得注意的是，我们必须不能破坏系统的环境。因为几个关键的实用应用程序依赖于Python 2.6.6。如果替换了系统的Python环境就会发生很多难以预见的错误，导致要重装系统
make && make altinstall
```
[参考](https://www.digitalocean.com/community/tutorials/how-to-set-up-python-2-7-6-and-3-3-3-on-centos-6-4)
[参考](http://www.nowamagic.net/academy/detail/1330215)

## 发布
项目放/usr/local/src,用xftp拖过去就行
安装pm2,运行项目
``` bash
npm install pm2 -g
pm2 start app.js
```
浏览器运行 http://23.106.139.203:3000
## 配置nginx
``` bash
yum install nginx  // 安装nginx
whereis nginx  // 查看nginx安装目录，/ect/nginx
```
在/ect/nginx/conf.d文件夹新建文件 xx.conf,输入一下内容
```bash
server {
    listen 80;
    server_name  localhost;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_set_header Connection "";
        proxy_pass http://23.106.139.203:3000; #node项目
        proxy_redirect default ;
    }
}

```
cd /ect/nginx 测试nginx并运行
```bash
nginx -t
nginx -s reload
//如果出错(nginx: [error] invalid PID number "" in "/var/run/nginx.pid"
)，运行
nginx -c /etc/nginx/nginx.conf
```
浏览器运行 http://23.106.139.203

## nginx vue histtory模式
1、config 文件 
``` bash
build: {
    assetsPublicPath: '/',  // './'改成'/'
}
```
2、vue router
``` bash
export default new Router({
  mode: 'history',
  routes: [
    ...
  ]
})
```
3、nginx配置
``` bash
server {
    listen 89;
    server_name localhost;
    location / {
        root /usr/local/src/jiatui89;
        index index.html;
        try_files $uri $uri/ /index.html = 404;
        error_page 404 /index.html;
    }
}
```
vue history 模式链接请求后台发现没有这个路由，找不到就跳转首页，让vue的路由去处理