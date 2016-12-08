1.安装Ruby

2.安装compass
gem install compass

3.项目初始化
compass create task-two

4 全局安装gulp
npm install –g gulp 

5 本地安装gulp
npm install gulp –save-dev

6 安装相关插件
{
  "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-compass": "^2.1.0",
    "gulp-concat": "^2.6.1",
    "gulp-htmlmin": "^3.0.0",
    "gulp-image": "^2.7.2",
    "gulp-minify-css": "^1.2.4",
    "gulp-uglify": "^2.0.0"
  }
}

7.最终编译后文件放在dest文件夹