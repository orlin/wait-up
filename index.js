var merge, request, wait;

wait = require("wait");

request = require("request");

merge = require("lodash").merge;

module.exports = function(opts, cb) {
  var cfg, track;
  cfg = {
    req: {
      timeout: 1000
    },
    spacings: 240,
    patience: 42000,
    dots: false
  };
  merge(cfg, opts);
  track = {
    retries: 0,
    duration: cfg.patience
  };
  wait.doAndRepeat(cfg.spacings, function() {
    return request.get(cfg.req, function(err, res) {
      if (!err) {
        if (track.retries && cfg.dots) {
          console.log();
        }
        return cb(merge(res, track));
      } else {
        ++track.retries;
        if (cfg.dots) {
          return process.stdout.write('.');
        }
      }
    });
  });
  return wait.wait(cfg.patience, function() {
    if (track.retries && cfg.dots) {
      console.log();
    }
    return cb(track);
  });
};
