#!/usr/bin/env coffee

onUp = require("./index")

args = process.argv.splice(2)
uri = if args.length > 0 then args[0] else "http://localhost/"
opts = method: "GET", uri: uri

console.log opts.method + ' ' + opts.uri

exit = (code, res) ->
  if res? then console.log "Got status #{res?.statusCode}"
  process.exit code

onUp opts, (res) ->
  if res?
    if res.statusCode is 200
      exit 0, res
    else
      exit 1, res
  else
    console.log "Giving-up after #{duration} ms"
    exit 1
