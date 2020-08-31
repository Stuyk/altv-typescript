import gulp from 'gulp';
import path from 'path';
import using from 'gulp-using';

const __dirname = process.cwd();

console.log(`[TS] Beginning File Copy`);

// cfg files
const cfgSyntax = `./src/**/*.cfg`;
gulp.src([path.join(__dirname, cfgSyntax)]).pipe(using({}));
gulp.src([path.join(__dirname, cfgSyntax)]).pipe(gulp.dest(path.join(__dirname, '/resources')));

// src-copy directory
const directorySyntax = './src-copy/**/*';
gulp.src([path.join(__dirname, directorySyntax)]).pipe(using({}));
gulp.src([path.join(__dirname, directorySyntax)]).pipe(gulp.dest(path.join(__dirname, '/resources')));

console.log(`[TS] Finished Copying Files`);
