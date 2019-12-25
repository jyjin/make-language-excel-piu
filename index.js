#!/usr/bin/env node
/**
 * 自定义命令
 * 
 * 调用方式
 * 
 * node app.js -l
 * node app.js --list
 * node app.js -d
 * node app.js -p
 * node app.js -r
 * node app.js -r test.js
 * node app.js -l -d -r
 * node app.js -ldr
 * node app.js -V
 * node app.js -h
 * 
 */
const exec = require('child_process').exec
const colors = require('colors')
const fs = require('fs')
const program = require('commander');
const readline = require('readline');

function readSyncByRl(tips) {
  tips = tips || '> ';
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(tips, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}




// 询问是否创建
function askCreate() {
  return readSyncByRl(' - 没有检测到目标文件language.js, 是否创建y/n?\r\n'.yellow)
}

function askAuthor() {
  return readSyncByRl(' - 创建人：\r\n'.yellow)
}

function askTask() {
  return readSyncByRl(' - 任务编号：\r\n'.yellow)
}

function askPrefix() {
  return readSyncByRl(' - 项目前缀（如h5.customer. 没有直接回车不填）：\r\n'.yellow)
}

function askModule() {
  return readSyncByRl(' - 当前页面名称（页面模块，没有直接回车不填）：\r\n'.yellow)
}

function askConfirmCreate() {
  return readSyncByRl(' - 检测到当前目录已有目标文件，是否直接生成?y/n\r\n'.yellow)
}

function createTempFile(userInput) {
  let tempStr = fs.readFileSync(__dirname + '/src/template.js').toString()
  tempStr = tempStr.replace('${prefix}', userInput.prefix)
    .replace('${author}', userInput.author)
    .replace('${taskNum}', userInput.taskNum)
    .replace('${page}', userInput.page)
  console.log('您创建到文件内容：\n'.yellow, tempStr.green)
  return fs.writeFileSync('./language.js', tempStr)
}

function createDist() {
  return new Promise(res => {
    exec(`mkdir -p 多语言excel`, error => {
      console.log('检查目录完毕！'.green)
      res(error)
    })
  })
}

let userInput = {}

const isHaveTempFile = !!~fs.readdirSync('./').indexOf('language.js')

if (!isHaveTempFile) {
  askCreate().then(yes => {
    if (yes) {
      return askAuthor()
    }
  }).then(author => {
    userInput.author = author
    return askTask()
  }).then(taskNum => {
    userInput.taskNum = taskNum
    return askPrefix()
  }).then(prefix => {
    userInput.prefix = prefix
    return askModule()
  }).then(page => {
    userInput.page = page
    return createTempFile(userInput)
  }).then(json => {
    console.log('创建成功！\n')
    console.log('请修改language.js中data后，执行piu')
    process.exit(1);
  })
} else {
  const make = require('./src/make.js')
  askConfirmCreate().then(yes => {
    if (yes) {
      return createDist()
    }
  }).then(error => {
    if (!error) {
      console.log('开始生成'.green)
      return make()
    }
  })
}






// program
//   .version('0.0.3')
//   .option('-n, --name', '展示项目版本信息')
//   .option('-t, --taskNum', '开发者模式运行')
//   .option('-p, --prefix', '发布模式运行')
//   .option('-r, --reset [type]', '删除文件')
//   .option('-y, --yes [type]', 'xiaoeya')
//   .parse(process.argv); // 接受命令行参数

// const YOUR_COMMAND = '你输入的命令是:'
// const YOUR_ARGS = '参数是:'
// if (program.list) {
//   console.log(`${YOUR_COMMAND} list ${YOUR_ARGS}${program.list}`);
// }
// if (program.develop) {
//   console.log(`${YOUR_COMMAND} develop ${YOUR_ARGS}${program.develop}`);
// }
// if (program.product) {
//   console.log(`${YOUR_COMMAND} product ${YOUR_ARGS}${program.product}`);
// }
// if (program.reset) {
//   console.log(`${YOUR_COMMAND} reset ${YOUR_ARGS}${program.reset}`);
// }
// if (program.yes) {
//   console.log(`${YOUR_COMMAND} yes ${YOUR_ARGS}${JSON.stringify(program, null, 2)}`);
// }
// // console.log(program.opts())





