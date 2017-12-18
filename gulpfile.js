//使用gulp编译koa2源代码 并检测代码变化自动编译
var gulp = require('gulp');
var babel = require('gulp-babel');

//当源代码改变时自动编译1
gulp.task('default', ['praise'], () =>
    gulp.watch(['!./src/public/*/*.es', './src/**/*.es'], ['praise'])
);
//编译Koa2代码
gulp.task('praise', () => {
        return gulp.src(['!./src/public/*/*.es', './src/**/*.es'])
            .pipe(babel({
                presets: ['es2015', 'stage-0']
            }))
            .pipe(gulp.dest('./build'))
    }
);