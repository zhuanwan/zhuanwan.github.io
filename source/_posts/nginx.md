title: linux部署node
---
node服务器部署，nginx， vue history + nginx
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

## nginx vue histtory模式（根路径）
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
[访问](http://23.106.139.203:89)

## nginx vue histtory模式（二级域名）
1、config 文件
``` bash
build: {
    assetsPublicPath: 'https://xxx.xxx.com/shop/assets/', // 方式1，打包生成的文件static文件夹放 https://xxx.xxx.com/shop/assets 下
    assetsPublicPath: '/',                                // 方式2，打包生成的文件放index同级目录
}
```
2、vue router
``` bash
export default new Router({
  mode: 'history',
  base: '/shop',
  routes: [
    ...
  ]
})
```
3、nginx配置
``` bash
server {
    listen 90;
    server_name localhost;
    location /shop {
        root /usr/local/src/jiatui90;
        index index.html;
        try_files $uri $uri/ /index.html = 404;
        error_page 404 /index.html;
     }
     // 如果要把静态资源js,css,img等放根目录下，那么写下面这句话，并设置assetsPublicPath方式2
     location  ~ .*\.(jpg|jpeg|gif|png|ico|css|js|pdf|txt)$ {
        root /usr/local/src/jiatui90;
     }
}
```
[访问](http://23.106.139.203:90/shop)

## nginx 常用命令
```
 nginx -v             // 查看Nginx的版本号
 start nginx          // 启动Nginx
 nginx -s stop        //快速停止或关闭Nginx
 nginx -s quit        // 正常停止或关闭  Nginx
 nginx -t             // 测试修改的config文件是否正确
 nginx -s reload      // 配置文件修改重装载命令
```

## nginx 本地解决跨域
config文件 转 https://blog.csdn.net/kh717586350/article/details/78802611
```
server {
    #前端ajax请求需要使用的地址为本机地址（就是ipconfig显示的地址因为Nginx部署在本地）,前端ajax请求需要使用端口为9000（可以随便选个）
    listen  9000;
    #服务器的名字随便去貌似没区别
    server_name  bididc;

    #下面这些都加了always，不知道有没区别，反正之前加了这些不行
    #特别是Access-Control-Allow-Origin，之前一直是*,都不管用
    add_header 'Access-Control-Allow-Methods' 'GET,OPTIONS,PUT,DELETE' always;
    add_header 'Access-Control-Allow-Credentials' 'true' always;
    add_header 'Access-Control-Allow-Origin' '$http_origin' always;
    add_header 'Access-Control-Allow-Headers' 'Authorization,DNT,User-Agent,Keep-Alive,Content-Type,accept,origin,X-Requested-With' always;

    if ($request_method = OPTIONS ) {
        return 200;
    }

    location / {
        #真实访问的服务器地址，因为在本机所以是localhost
        proxy_pass http://192.168.1.101:8080/;
    }
}
```