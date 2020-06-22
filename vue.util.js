const glob = require('glob')
const startPath = './src/pages/'

exports.pages = function () {
  let entryFiles = glob.sync(startPath + '/**/*.vue');  //pages下面每个文件夹里的.vue路径数组,因为.html有时候不存在
  let obj = {}
  //遍历.vue数组
  entryFiles.forEach(filePath => {
      let filename = filePath.substring(filePath.lastIndexOf('/')+1 , filePath.lastIndexOf('.'));   //取最后一个/到最后一个.之间的字符
      let tmp = glob.sync(filePath.substring(0, filePath.lastIndexOf('/'))+'/*.html');  //匹配包含.html文件的路径

      obj[filename] = {
        entry: filePath.substring(0, filePath.lastIndexOf('/')+1) + 'main.js',
        template: tmp[0]?tmp[0]:'index.html',  //当前目录存在.html就以此为模板，否则以public/index.html为模板
        filename: filename + '.html'  //浏览器上的访问地址
      }
  })
  return obj
}