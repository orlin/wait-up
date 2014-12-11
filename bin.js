var duration, exit, opts, patience, request, spacings, wait, waiting;

wait = require("wait");

request = require("request");

patience = 1000;

spacings = 240;

duration = 42000;

opts = {
  method: "GET",
  uri: "http://localhost/",
  timeout: patience
};

exit = function(code, res) {
  if (res != null) {
    console.log("Got status " + (res != null ? res.statusCode : void 0));
  }
  return process.exit(code);
};

console.log(opts.method + ' ' + opts.uri);

waiting = false;

wait.doAndRepeat(spacings, function() {
  return request.get(opts, function(err, res) {
    if (!err) {
      if (waiting) {
        console.log();
      }
      if (res.statusCode === 200) {
        return exit(0, res);
      } else {
        return exit(1, res);
      }
    } else {
      waiting = true;
      return process.stdout.write('.');
    }
  });
});

wait.wait(duration, function() {
  if (waiting) {
    console.log();
  }
  console.log("Giving-up after " + duration + " ms");
  return exit(1);
});
