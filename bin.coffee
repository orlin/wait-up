#!/usr/bin/env coffee

onUp = require("on-up")

args = process.argv.splice(2)
uri = if args.length > 0 then args[0] else "http://localhost/"
opts = req: { method: "GET", uri: uri }, dots: true

console.log opts.req.method + ' ' + opts.req.uri

exit = (code, res) ->
  if res? then console.log "Got status #{res?.statusCode}"
  process.exit code

onUp opts, (res) ->
  if res.statusCode?
    if res.statusCode is 200
      exit 0, res
    else
      exit 1, res
  else
    console.log "Gave-up after #{res.retries} failed requests, within #{res.duration} ms"
    exit 1
