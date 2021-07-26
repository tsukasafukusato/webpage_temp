const fs = require('fs');
const gulp = require("gulp");
const copy = require("gulp-copy");
const data = require('gulp-data');
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const yaml = require("js-yaml")
const csvParse = require('csv-parse/lib/sync');
const sharp = require("sharp");
const glob = require("glob");

// Define paths to the data
const menu_data_path = "src/data/menu.yml";
const organizing_committee_data_path = "src/data/organizing-committee.yml"
const program_committee_data_path = "src/data/program-committee.csv"

gulp.task('asset-processing', function(done) {
    // Compress committee member portraits and copy them to the destination directory
    const files = glob.sync("src/assets/committee/*.*");
    const size = 480;
    const quality = 80;
    fs.mkdirSync("dst/assets/committee", { recursive: true });
    files.forEach(function(file) {
        const name = file.substring(file.lastIndexOf('/') + 1).replace(".jpg", "").replace(".png", "");
        sharp(file)
            .resize({ width: size, height: size, fit: "cover" })
            .jpeg({ quality: quality })
            .toFile("dst/assets/committee/" + name + ".jpg");
    });

    // Compress sponsor logos and copy them to the destination directory
    const sponsor_logo_files = glob.sync("src/assets/sponsors/*.*");
    fs.mkdirSync("dst/assets/sponsors", {recursive: true });
    sponsor_logo_files.forEach(function(file) {
        const name = file.substring(file.lastIndexOf('/') + 1).replace(".jpg", "").replace(".png", "");
        sharp(file)
            .resize({ width: size, height: size, fit: "inside" })
            .png()
            .toFile("dst/assets/sponsors/" + name + ".png");
    });

    // Copy the previous cover images as thumbnails
    // TODO: Compress these images
    gulp.src("src/assets/originals/**/*")
        .pipe(gulp.dest("dst/assets/thumbnails"));

    // Copy the previous cover images
    gulp.src("src/assets/originals/**/*")
        .pipe(gulp.dest("dst/assets/originals"));

    gulp.src("src/assets/logo/**/*.png")
        .pipe(gulp.dest("dst/assets/logo"));

    fs.mkdirSync("dst/assets/textures", {recursive: true });
    sharp("src/assets/textures/texture.jpg")
        .resize({ width: 2400 })
        .jpeg({ quality: 60 })
        .toFile("dst/assets/textures/texture.jpg");

    done();
});

gulp.task('pug', function(done) {
    // Read YAML files
    const menu_data = yaml.load(fs.readFileSync(menu_data_path));
    const organizing_committee_data = yaml.load(fs.readFileSync(organizing_committee_data_path));

    // Read CSV files
    const program_committee_data = csvParse(fs.readFileSync(program_committee_data_path), {columns: true});

    gulp.src("src/*.pug")
        .pipe(data(function(file) {
            return {
                menu_data: menu_data,
                organizing_committee_data: organizing_committee_data,
                program_committee_data: program_committee_data
            };
        }))
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest("dst"));
    done();
});

gulp.task('sass', function(done) {
    gulp.src("src/sass/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("dst/css"));
    done();
});

gulp.task('copy', function(done) {
    gulp.src("src/downloads/**/*")
        .pipe(gulp.dest("dst/downloads"));
    done();
});

gulp.task('default', gulp.parallel('asset-processing', 'pug', 'sass', 'copy'));
