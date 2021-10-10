var gulp 			= require("gulp");
var sass 			= require("gulp-sass");
var htmlmin 		= require("gulp-htmlmin");
var imagemin 		= require('gulp-imagemin');
var notify 			= require("gulp-notify");
var uglify 			= require("gulp-uglify");
var browserSync 	= require("browser-sync").create();
var del 			= require("del");

/* Tasks cached */
gulp.task("cache:css", function() {
	del("._min/*,.css")
});

gulp.task("cache:js", function() {
	del("._min/*,.js")
});


/* Task compile scss to css */
gulp.task("sass", ['cache:css'], function() {
	return gulp.src("./css/**/**/**/*.css")
				.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
				.on('error', notify.onError({title: "erro scss", message: "<%= error.message %>"}))
				.pipe(gulp.dest("./_min"))
				.pipe(browserSync.stream());				
});

/* Task minify js */
gulp.task("js", ['cache:js'], function() {
	return gulp.src("./js/*/*/*/*.js")
				.pipe(uglify())
				.pipe(gulp.dest("./_min"))
				.pipe(browserSync.stream());
});


/* Task minify html */
gulp.task("html", function() {
	return gulp.src(["./*.html", "./*.php"])
				.pipe(htmlmin({collapseWhitespace: true}))
				.pipe(gulp.dest("./_min"))
				.pipe(browserSync.stream());
});

/* Task server web local PHP */
	gulp.task("server", function() {
		browserSync.init({
			proxy: "http://localhost/site-veloo-telecom/dev"
		});

	/* Watch */
	gulp.watch("./css/**/*/*.css", ['sass']);
	gulp.watch("./js/**/*/*.js", ['js']);
	gulp.watch(["./*.html","./*.php" ], ['html']);
});

gulp.task("default", ["server"]);