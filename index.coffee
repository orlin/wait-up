#!/usr/bin/env coffee

wait = require("wait")
request = require("request")

patience = 1000 # how long request will wait (timeout)
spacings = 240 # time in-between retries
duration = 42000 # the ultimate patience of a process

module.exports = (opts, cb) ->

  waiting = false
  opts.patience ?= patience

  wait.doAndRepeat spacings, ->
    request.get opts, (err, res) ->
      if !err
        console.log() if waiting
        cb res
      else
        # isn't up yet
        waiting = true
        process.stdout.write '.'

  wait.wait duration, ->
    console.log() if waiting
    cb()
