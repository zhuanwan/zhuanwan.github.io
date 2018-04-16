title: hexo博客搭建
---
hexo博客搭建和一些配置
<!-- more -->
## 项目搭建

### 本地新建项目

参考[hexo 文档](https://hexo.io/zh-cn/docs/)

### 关联GitHub
1、github 创建项目
2、公钥私钥 打开git bash,进入目录 cd ~/.ssh
(如果期间报错'could not open a authentication agent' 输入 eval \`ssh-agent\`)

ssh-keygen 生成公钥私钥，提示要取的名字，enter键默认id_rsa,这里我输入id_rsa_blogs,然后提示输入密码，enter键默认为空
自定义钥匙名字需要在~/.ssh下新建config文件，比如我这里的id_rsa_blogs,在config文件里输入以下代码保存
``` bash
github.com
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa_blogs
```

3、然后把 .ssh 目录下的id_rsa_blogs公钥放到github上
ssh-add -l  // 查看所有添加进去的钥匙
把刚刚创建的钥匙添加进去
ssh-add ~/.ssh/id_rsa_blogs
再次输入 ssh-add -l 可以看到刚刚加入的钥匙
测试是否连接到github
ssh -T git@github.com
这个会在.ssh 文件夹下创建known_hosts文件，应该是方便下次快速连接的


### 测试
1、安装git插件 hexo-deployer-git
2、本地运行

``` bash
hexo g      // 生成
hexo d      // 发布
```


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

## 配置修改

1、首页显示文章列表-> yelee主题的_config.xml里面的search:onload false改成search:on false
2、首页显示文章列表摘要，在文章开头写好摘要后，另起一行键入<!−− more −−>，像这样：

\-\-\-
这里是摘要
<\!\-\- more \-\->
这里是正文


如果想标题+摘要，这样写

title: hexo博客搭建
\-\-\-
这里是摘要
<\!\-\- more \-\->
这里是正文

3、新建一个 about 页面：

hexo new page "about"

