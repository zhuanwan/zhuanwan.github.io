---
title: hexo博客搭建
---
Welcome to [Hexo](https://hexo.io/)! 

## 项目搭建

### 本地新建项目

参考[hexo 文档](https://hexo.io/zh-cn/docs/)

### 关联GitHub
1、github 创建项目
2、公钥私钥 打开git bash
eval `ssh-agent`(这个是报错'could not open a authentication agent' 输入)
ssh-keygen

生成公钥私钥，提示要取的名字，enter键默认id_rsa,这里我输入id_rsa_blogs,然后提示输入密码，enter键默认为空
然后把 .ssh 目录下的id_rsa_blogs公钥放到github上
ssh-add -l  // 查看所有添加进去的钥匙
把刚刚创建的钥匙添加进去
ssh-add ~/.ssh/id_rsa_blogs
再次输入 ssh-add -l 就可以看到刚刚加入的钥匙
测试是否连接到github
ssh -T git@github.com
这个会在.ssh 文件夹下创建known_hosts文件，应该是方便下次快速连接的

``` bash
eval `ssh-agent`
ssh-keygen
ssh-add -l
ssh-add ~/.ssh/id_rsa_blogs
ssh -T git@github.com
```

### 测试
1、安装git插件 hexo-deployer-git 
2、本地运行

``` bash
hexo g      // 生成
hexo d      // 发布
```

[博客地址](https://zhuanwan.github.io)


### 多台电脑编辑

1、本地新建分支hexo,把源代码提交到远程hexo，这样github上就有两个分支，一个是hexo分支源码，一个master静态文件
2、每次新电脑git clone，然后切换到hexo 分支，npm install，修改后提交hexo，然后生成发布一遍
3、总是在hexo分支上做修改发布

``` bash
npm install
npm install hexo-cli -g
git clone https://github.com/MOxFIVE/hexo-theme-yelee.git themes/yelee // 主题
hexo g      // 生成
hexo d      // 发布
```


