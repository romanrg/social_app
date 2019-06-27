import gulp from 'gulp';
import less from 'gulp-less';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import del from 'del';
import image from 'gulp-image';

/*==================================*/
const paths = {
    styles: {
        src: 'src/stylesheets/**/app.less',
        dest: 'build/styles'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/scripts'
    },
    images : {
        src: 'src/img/*',
        dest: 'build/img'
    }
}
//=====================================



//Tasks 
export const clean = () => del([ 'build' ]);





export function styles() {
    return gulp.src(paths.styles.src)
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest));
}

export function scripts() {
    return gulp.src(paths.scripts.src, {sourcemaps: true})
        .pipe(babel())               
        .pipe(concat('main.min.js'))
        .pipe(uglify()) 
        .pipe(gulp.dest(paths.scripts.dest))
}

export function images() {
    return gulp.src(paths.images.src)
        .pipe(image())
        .pipe(gulp.dest(paths.images.dest));
}



function watchFiles() {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.images.src, images);
}

export { watchFiles as watch};

const build = gulp.series(clean, gulp.parallel(styles, scripts, images));

export default build;