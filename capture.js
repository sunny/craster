// Generated by CoffeeScript 1.8.0
(function() {
  var args, async, height, i, image_path, increment, page, path, rotateY, rotations, rotator, total, url, width;

  args = require('system').args;

  async = require('async');

  page = require('webpage').create();

  if (args.length !== 6) {
    console.log("Usage: phantomjs capture-phantom.coffee URL PATH TOTAL WIDTH" + " HEIGHT");
    phantom.exit(1);
  } else {
    url = args[1];
    path = args[2];
    total = parseInt(args[3], 10);
    width = parseInt(args[4], 10);
    height = parseInt(args[5], 10);
    increment = 360 / total;
    rotations = (function() {
      var _i, _results;
      _results = [];
      for (i = _i = 0; _i < 360; i = _i += increment) {
        _results.push(i);
      }
      return _results;
    })();
    image_path = function(rotation) {
      var num;
      num = ("000" + rotation).slice(-3);
      return path.replace('.png', '') + ("-" + num + ".png");
    };
    rotateY = function(y) {
      window.viewer.rotate(0, y, 0);
      return window.viewer.update();
    };
    rotator = function(i, callback) {
      var rotation;
      rotation = i * increment;
      console.log("" + i + "/" + total + ": Rotate to " + rotation);
      page.evaluate(rotateY, increment);
      return window.setTimeout((function() {
        page.render(image_path(rotation));
        return callback();
      }), 100);
    };
    page.viewportSize = {
      width: width,
      height: height
    };
    page.paperSize = {
      width: width,
      height: height
    };
    page.clipRect = {
      top: 0,
      left: 0,
      width: width,
      height: height
    };
    page.onConsoleMessage = function(msg) {
      return console.log("console: " + msg);
    };
    page.open(url, function() {
      var _i, _results;
      return async.eachSeries((function() {
        _results = [];
        for (var _i = 0; 0 <= total ? _i <= total : _i >= total; 0 <= total ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this), rotator, function() {
        return phantom.exit();
      });
    });
  }

}).call(this);