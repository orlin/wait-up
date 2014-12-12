var args, exit, onUp, opts, uri;

onUp = require("on-up");

args = process.argv.splice(2);

uri = args.length > 0 ? args[0] : "http://localhost/";

opts = {
  req: {
    method: "GET",
    uri: uri
  },
  dots: true
};

console.log(opts.req.method + ' ' + opts.req.uri);

exit = function(code, res) {
  if (res != null) {
    console.log("Got status " + (res != null ? res.statusCode : void 0));
  }
  return process.exit(code);
};

onUp(opts, function(res) {
  if (res.statusCode != null) {
    if (res.statusCode === 200) {
      return exit(0, res);
    } else {
      return exit(1, res);
    }
  } else {
    console.log("Gave-up after " + res.retries + " failed requests, within " + res.duration + " ms");
    return exit(1);
  }
});
