// my Config
var config = {
  "baseDir": "./",
  "default": {
    "server": "static"
  },
  "html": {
    "src": ["**/*.html"]
  },
  "js": {
    "src": ["**/*.js"]
  },
  "css": {
    "src": ["**/*.css"]
  }
};

var gulp         = require('gulp');
var browserSync  = require('browser-sync');


// Static Task
gulp.task('static', function() {
  return browserSync({
    server: {
      baseDir: config.baseDir
    },
    open: false
  });
});

// Watch Task
gulp.task('watch', function() {
  gulp.watch(config.baseDir + '/' + config.html.src).on("change", browserSync.reload);
  gulp.watch(config.baseDir + '/' + config.js.src).on("change", browserSync.reload);
  gulp.watch(config.baseDir + '/' + config.css.src).on("change", browserSync.reload);
});

// Default Task
gulp.task('default', [config.default.server, 'watch']);