var args, exit, onUp, opts, uri;

onUp = require("./index");

args = process.argv.splice(2);

uri = args.length > 0 ? args[0] : "http://localhost/";

opts = {
  method: "GET",
  uri: uri
};

console.log(opts.method + ' ' + opts.uri);

exit = function(code, res) {
  if (res != null) {
    console.log("Got status " + (res != null ? res.statusCode : void 0));
  }
  return process.exit(code);
};

onUp(opts, function(res) {
  if (res != null) {
    if (res.statusCode === 200) {
      return exit(0, res);
    } else {
      return exit(1, res);
    }
  } else {
    console.log("Giving-up after " + duration + " ms");
    return exit(1);
  }
});
