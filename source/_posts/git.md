title: git 命令
---
git一些命令
<!-- more -->

``` bash
// 删除本地分支 
git branch -D branch-name

// 删除远端分支
git branch -d -r branchname

// 查看所有分支，本地和远程
git branch -a

// 创建新的分支，但是不切换过去
git branch newbranch

// 分支切换，切换到分支branchname 上去
git checkout branchname

// 创建新的分支branchname，并且切换过去
git checkout -b branchname

// 重新设置远程路径
// 如果输错密码就删除Credentials里面的文件
// C:\Users\你的用户名\AppData\Local\Microsoft\Credentials 删除就不会记住密码
git remote set-url origin [url]


```

gitlab上删除了某些远程分支，但在本地git branch -a仍然可以看到被删除的远程分支，

git remote show origin 来查看有关于origin的一些信息，可以发现他提示你用 git remote prune 来删除分支

执行git remote prune，在git branch -a查看发下远程删除的分支没有了

