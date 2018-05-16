var gulp        = require("gulp"),
    sass        = require("gulp-sass"),
    rename      = require("gulp-rename"),
    cssmin      = require("gulp-cssnano"),
    prefix      = require("gulp-autoprefixer"),
    sourcemaps  = require("gulp-sourcemaps"),
    rev         = require("gulp-rev"),
    clean       = require('gulp-clean'),
    revRewrite  = require("gulp-rev-rewrite");

var browserSync = require("browser-sync").create();


// Static Server + watching scss/html files

gulp.task("serve", function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch("source/style/**/*.scss", ["sass"]).on("change", browserSync.reload);
    gulp.watch("source/*.html", ["copy-index-dev"]).on("change", browserSync.reload);
});
gulp.task('clean-css', function () {
    return gulp.src('public/css', {read: false})
        .pipe(clean());
});
gulp.task('copy-index-dev', function() {
    return gulp.src('./source/index.html').pipe(gulp.dest('./public'));
});
// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", ["clean-css", "copy-index-dev"], function() {
    return gulp.src("source/style/style.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});

// Build the CSS for production
var sassOptions = {
    outputStyle: "expanded"
};

var prefixerOptions = {
    browsers: ["last 2 versions"]
};
gulp.task("minify", ["clean-css"], function() {
    gulp.src("source/style/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(prefix(prefixerOptions))
        .pipe(cssmin())
        .pipe(rev())
        .pipe(gulp.dest("public/css"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("public/css"));
});

gulp.task("revRewrite", ["minify"], function() {
    setTimeout(function() {
        // Workaround to be sure manifest is created.
        const manifest = gulp.src("public/css/rev-manifest.json");
        return gulp.src("source/index.html")
            .pipe(revRewrite({ manifest: manifest }))
            .pipe(gulp.dest("public"));
    }, 500);
});

gulp.task("build", ["revRewrite"]);
gulp.task("dev", ["sass", "serve"]);