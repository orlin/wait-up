var merge, request, wait;

wait = require("wait");

request = require("request");

merge = require("lodash").merge;

module.exports = function(opts, cb) {
  var cfg, waiting;
  cfg = {
    req: {
      timeout: 1000
    },
    spacings: 240,
    patience: 42000
  };
  waiting = false;
  merge(cfg, opts);
  wait.doAndRepeat(cfg.spacings, function() {
    return request.get(cfg.req, function(err, res) {
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
  return wait.wait(cfg.patience, function() {
    if (waiting) {
      console.log();
    }
    return cb();
  });
};
