#!/usr/bin/env coffee

wait = require("wait")
request = require("request")

patience = 1000 # how long request will wait (timeout)
spacings = 240 # time in-between retries
duration = 42000 # the ultimate patience of a process
opts = method: "GET", uri: "http://localhost/", timeout: patience

exit = (code, res) ->
  if res? then console.log "Got status #{res?.statusCode}"
  process.exit code

console.log opts.method + ' ' + opts.uri
waiting = false

wait.doAndRepeat spacings, ->
  request.get opts, (err, res) ->
    if !err
      console.log() if waiting
      if res.statusCode is 200
        exit 0, res
      else
        exit 1, res
    else
      # isn't up yet
      waiting = true
      process.stdout.write '.'

wait.wait duration, ->
  console.log() if waiting
  console.log "Giving-up after #{duration} ms"
  exit 1
