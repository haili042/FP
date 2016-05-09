var gulp = require('gulp')
  , liveReload = require('gulp-livereload')
  , plumber = require('gulp-plumber')
;

var tomcatPath = 'D:\\haili_developing_software\\apache-tomcat-7.0.55\\webapps\\FP\\'

    ;

var config = {

};
gulp.task('default', ['reload']);

gulp.task('reload', function() {

    liveReload({
        basePath: 'http://localhost:8080/FP/',
        port: '8080'
    });

    gulp.watch('app/**/*.*', function (file) {
        console.log(file.path);
        liveReload();
    });

    gulp.watch('index.jsp', function (file) {
        console.log(file.path);
        liveReload();
    });
});

