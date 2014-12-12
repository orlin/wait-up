var duration, patience, request, spacings, wait;

wait = require("wait");

request = require("request");

patience = 1000;

spacings = 240;

duration = 42000;

module.exports = function(opts, cb) {
  var waiting;
  waiting = false;
  if (opts.patience == null) {
    opts.patience = patience;
  }
  wait.doAndRepeat(spacings, function() {
    return request.get(opts, function(err, res) {
      if (!err) {
        if (waiting) {
          console.log();
        }
        return cb(res);
      } else {
        waiting = true;
        return process.stdout.write('.');
      }
    });
  });
  return wait.wait(duration, function() {
    if (waiting) {
      console.log();
    }
    return cb();
  });
};
