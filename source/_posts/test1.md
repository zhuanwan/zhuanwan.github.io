---
title: hexo博客搭建
---
Welcome to [Hexo](https://hexo.io/)! 

## 项目搭建

### 本地新建项目

参考[hexo 文档](https://hexo.io/zh-cn/docs/)

### 关联GitHub

参考[hexo 文档](https://hexo.io/zh-cn/docs/)

### 多台电脑编辑

本地新建分支hexo,把代码提交到远程hexo,进入blog目录,打开git bash

``` bash
git checkout -b hexo
git add .
git commit -m "文字描述"
git push --set-upstream origin hexo
```
另一台电脑上
公钥私钥 git bash
ssh-keygen -t rsa -C "邮箱"

生成公钥私钥，提示要取的名字，enter键默认id_rsa,这里我输入id_rsa_blogs,然后提示输入密码，enter键默认为空
然后把 .ssh 目录下的id_rsa_blogs公钥放到github上

 
sh-add -l  // 查看所有添加进去的钥匙
把刚刚创建的钥匙添加进去
sh-add ~/.ssh/id_rsa_blogs
再次输入 sh-add -l 就可以看到刚刚加入的钥匙
测试是否连接到github
ssh -T git@github.com
这个会在.ssh 文件夹下创建known_hosts文件，应该是方便下次快速连接的



git checkout hexo
npm install
npm install hexo-cli -g

