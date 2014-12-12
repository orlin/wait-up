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
    dots: false # true allows side-effects (i.e. write dots to stdout)

  merge cfg, opts
  track = retries: 0, duration: cfg.patience

  wait.doAndRepeat cfg.spacings, ->
    request.get cfg.req, (err, res) ->
      if !err
        console.log() if track.retries and cfg.dots
        cb merge res, track
      else
        # isn't up yet
        ++track.retries
        process.stdout.write '.' if cfg.dots

  wait.wait cfg.patience, ->
    console.log() if track.retries and cfg.dots
    cb track
