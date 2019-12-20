## 多语言简易Excel生成工具

> 适用环境
- window/mac/Linux
- 机器装有node

> 使用方法

#### 安装
```
$ npm i make-language-excel-piu -g
```

#### 使用
1.打开git bash 执行命令`piu`
```
$ piu
```
2.如果当前目录，没有`language.js`文件，请根据依次录入多语言需要的参数，如图：


![avatar](https://raw.githubusercontent.com/jyjin/make-language-excel-piu/master/doc/piu1.png)

3.全部录入完毕会在当前目录生成一个`language.js`文件

![avatar](https://raw.githubusercontent.com/jyjin/make-language-excel-piu/master/doc/piu2.png)
> lanuage.js内容
格式
```
module.exports = {
   // 多语言内容 【！！！这里是你要粘贴的内容...！！！】
  data: {
    'loading': '加载中',
    'my.name': '我的名字',
    'my.age': '我的年龄',
  },
   // 国际化
  local: ['zh_CN', 'en_US'],

  // 项目标识
  prefix: '${prefix}',

  // 添加人 可以为空
  author: '${author}',

  // 任务编号或名称
  taskNum: '${taskNum}',

  // 模块
  page: '${page}'

}
```

4.打开`language.js`将需要导入的多语言项粘贴进`data`属性里

例

```
module.exports = {
   data: {
      'loading': '加载中',
      'my.name': '我的名字',
      'my.age': '我的年龄',
   },
   local: ['zh_CN', 'en_US'],
   ...
}
```

5.再次执行`piu`命令
![avatar](https://raw.githubusercontent.com/jyjin/make-language-excel-piu/master/doc/piu3.png)

会生成一个文件夹，里面有需要的多语言excel
![Dir](https://raw.githubusercontent.com/jyjin/make-language-excel-piu/master/doc/piu4.png)

Excel内容
![Avatar](https://raw.githubusercontent.com/jyjin/make-language-excel-piu/master/doc/piu5.png)



### 更新日志

jyjin create at 2019.12.20


MIT