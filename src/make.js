
const xlsx = require('node-xlsx')
const moment = require('moment')
// const { local, data, prefix, author, taskNum, page } = require('../language')
const colors = require('colors');
// const { local, data, prefix, page } = require('/Users/jyjin/Desktop/language.js')
const fs = require('fs')
let source = []

module.exports = function () {

  const { local, data, prefix, author, taskNum, page } = eval(fs.readFileSync('./language.js').toString())



  // 空5行
  for (let i = 0; i < 5; i++) {
    source.unshift(['', '', '', '', '', '', '', ''])
  }

  // 表头
  const header = ['表名', '主键', '租户id', '国际化key值', '国家key值', '描述', '逻辑标志位', '平台层']

  const headerKey = ['sys_prompts', '*prompt_id', '#iam_organization_id', '#prompt_code', '#lang', '#description', 'is_deleted', '#is_site']
  source = [...source, header, headerKey]

  // 插入数据
  let i = 0
  for (var key in data) {
    const rowLan0 = ['', ++i, 0, prefix + page + '.' + key, local[0], data[key], 'N', 'Y']
    const rowLan1 = ['', ++i, 0, prefix + page + '.' + key, local[1], '', 'N', 'Y']
    source.push(rowLan0, rowLan1)
  }

  // 空3列
  let final = []
  source.map(row => {
    final.push(['', '', ''].concat(row))
  })


  final.map((item, index) => {
    if (index > 6) {
      item[0] = author
      item[1] = taskNum
    }
    if (index === 5) {
      item[0] = '创建人'
      item[1] = '任务编号'
    }
    if (index === 6) {
      item[0] = 'creator'
      item[1] = 'task_num'
    }
  })

  // 生成excel
  const buffer = xlsx.build([{ name: "README", data: [] }, { name: "sys_prompts", data: final }]);
  const fileName = `./多语言excel/多语言-${moment().format('YYYY年MM月DD日-HH时MM分ss秒')}.xlsx`

  fs.writeFile(fileName, buffer, (err) => {
    if (err) {
      console.log('Excel 生成失败!\n'.red, err)
    } else {
      final.map((item, index) => {
        if (index === 0) {
          console.log('============================================================================================================================================================'.yellow)
        }
        else if (index <= 4) {
          // console.log('')
        } else if (index > 4) {


          item.map((cell, col) => {
            cellHeader = cell
            if (index === 5) {
              cellHeader = cell.green
            } else if (index === 6) {
              cellHeader = cell.red
            } else {
              if (col === 6 || col === 8) {
                cellHeader = cell.green
              }
            }
            process.stdout.write(cellHeader);
            process.stdout.write('\t|'.yellow);
          })
          process.stdout.write('\n')
        }
        if (index === 6) {
          console.log('============================================================================================================================================================'.yellow)
        }
      })
      console.log('------------------------------------------------------------------------------------------------------------------------------------------------------------'.yellow)
      console.log('Excel 生成成功!'.green)
    }
  })

}
