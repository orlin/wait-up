#!/usr/bin/env coffee

wait = require("wait")
request = require("request")
merge = require("lodash").merge

module.exports = (opts, cb) ->

  cfg =
    req:
      timeout: 1000 # how long request will wait before timing-out / repeat
    spacings: 240 # time in-between retries
    patience: 42000 # the ultimate patience (i.e. max duration wait)

  waiting = false
  merge cfg, opts

  wait.doAndRepeat cfg.spacings, ->
    request.get cfg.req, (err, res) ->
      if !err
        console.log() if waiting
        cb res
      else
        # isn't up yet
        waiting = true
        process.stdout.write '.'

  wait.wait cfg.patience, ->
    console.log() if waiting
    cb()
