var gulp = require('gulp');
var compass = require('gulp-compass');
var mincss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');

//task-css
gulp.task('compass', function() {
	//编译css 
	gulp.src('./sass/bus-stop.scss')
		.pipe(compass({
			config_file: './config.rb',
			css: './dest/css',
			sass: 'sass'
		}))
		.pipe(mincss()) //压缩css
		.pipe(gulp.dest('./dest/css'));
});

//task-html
gulp.task('comminifyhtml', function() {
	gulp.src('./source/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true,
			minifyCSS: true,
			minifyJS: true
		}))
		.pipe(gulp.dest('./dest'));
});

//监测
gulp.task('watch', function() {
	gulp.watch('./sass/*.scss', ['compass']);
	gulp.watch('./source/*.html', ['comminifyhtml']);
});
//任务列表
var tasklist = ['compass', 'comminifyhtml'];
gulp.task('default', tasklist, function() {
	// 将你的默认的任务代码放在这
	console.log('task default');
});